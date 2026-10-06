import os
import re
import base64
import json

def extract_all():
    print("Reading index.html...")
    with open("index.html", "r", encoding="utf-8") as f:
        html = f.read()

    os.makedirs("public/fonts", exist_ok=True)
    os.makedirs("public/videos", exist_ok=True)
    os.makedirs("public/media", exist_ok=True)
    os.makedirs("public/images", exist_ok=True)
    os.makedirs("src/data", exist_ok=True)

    # 1. Extract Fonts
    print("Extracting fonts...")
    font_matches = list(re.finditer(r'@font-face\s*\{([^}]+)\}', html))
    font_names = [
        "dm-sans-700.woff2",
        "dm-sans-800.woff2",
        "dm-sans-900.woff2",
        "inter-400.woff2",
        "inter-500.woff2",
        "inter-600.woff2",
        "inter-700.woff2",
    ]
    for i, m in enumerate(font_matches):
        block = m.group(1)
        src_match = re.search(r'data:font/woff2(?:;charset=utf-8)?;base64,([A-Za-z0-9+/=]+)', block)
        if src_match and i < len(font_names):
            data = base64.b64decode(src_match.group(1))
            path = os.path.join("public/fonts", font_names[i])
            with open(path, "wb") as out:
                out.write(data)
            print(f"  Saved font: {path} ({len(data)} bytes)")

    # 2. Extract Video
    print("Extracting hero video...")
    vid_match = re.search(r'data:video/mp4;base64,([A-Za-z0-9+/=]+)', html)
    if vid_match:
        data = base64.b64decode(vid_match.group(1))
        path = "public/videos/hero.mp4"
        with open(path, "wb") as out:
            out.write(data)
        print(f"  Saved video: {path} ({len(data)} bytes)")

    # 3. Extract Images
    print("Extracting images...")
    # Find logo
    logo_match = re.search(r'class="logo(?:F)?"[^>]*><img[^>]*src="data:image/png;base64,([A-Za-z0-9+/=]+)"', html)
    if logo_match:
        data = base64.b64decode(logo_match.group(1))
        with open("public/images/logo.png", "wb") as out:
            out.write(data)
        print(f"  Saved logo: public/images/logo.png ({len(data)} bytes)")

    # Find all data:image/jpeg;base64,... images and their context
    img_matches = list(re.finditer(r'<img\b[^>]*src="data:image/(jpeg|png);base64,([A-Za-z0-9+/=]+)"[^>]*alt="([^"]*)"', html))
    print(f"  Found {len(img_matches)} images with alt text")

    # Let's also extract by section
    # Home preview images
    home_matches = re.findall(r'<div class="ph hb"[^>]*><img[^>]*src="data:image/jpeg;base64,([A-Za-z0-9+/=]+)"[^>]*alt="([^"]*)"', html)
    # Cargo images (in #p-ladungen)
    ladungen_part = html[html.find('id="p-ladungen"'):html.find('id="p-news"')] if 'id="p-ladungen"' in html else ""
    ladungen_imgs = re.findall(r'src="data:image/jpeg;base64,([A-Za-z0-9+/=]+)"[^>]*alt="([^"]*)"', ladungen_part)

    # News images (in #p-news)
    news_part = html[html.find('id="p-news"'):html.find('id="p-team"')] if 'id="p-news"' in html else ""
    news_imgs = re.findall(r'src="data:image/jpeg;base64,([A-Za-z0-9+/=]+)"[^>]*alt="([^"]*)"', news_part)

    # Team images (in #p-team)
    team_part = html[html.find('id="p-team"'):html.find('id="p-kontakt"')] if 'id="p-team"' in html else ""
    team_imgs = re.findall(r'src="data:image/jpeg;base64,([A-Za-z0-9+/=]+)"[^>]*alt="([^"]*)"', team_part)

    saved_count = 0
    # Save cargo images
    cargo_manifest = []
    for i, (b64, alt) in enumerate(ladungen_imgs):
        filename = f"cargo-{i+1}.jpg"
        filepath = os.path.join("public/media", filename)
        data = base64.b64decode(b64)
        with open(filepath, "wb") as out:
            out.write(data)
        cargo_manifest.append({"id": i+1, "filename": filename, "alt": alt, "src": f"/media/{filename}"})
        saved_count += 1
    with open("src/data/cargo.json", "w", encoding="utf-8") as out:
        json.dump(cargo_manifest, out, indent=2, ensure_ascii=False)
    print(f"  Saved {len(cargo_manifest)} cargo images to public/media/")

    # Save news thumbnails
    news_manifest = []
    for i, (b64, alt) in enumerate(news_imgs):
        filename = f"news-{i+1}.jpg"
        filepath = os.path.join("public/media", filename)
        data = base64.b64decode(b64)
        with open(filepath, "wb") as out:
            out.write(data)
        news_manifest.append({"id": i+1, "filename": filename, "alt": alt, "src": f"/media/{filename}"})
        saved_count += 1
    print(f"  Saved {len(news_manifest)} news images to public/media/")

    # Save team portraits
    team_names = ["lars-elkjaer", "cord-juergens", "kai-juehdes", "maureen-kobe", "sabine-krueger", "matthis-osmers", "uwe-albrecht"]
    team_manifest = []
    for i, (b64, alt) in enumerate(team_imgs):
        name_slug = team_names[i] if i < len(team_names) else f"member-{i+1}"
        filename = f"team-{name_slug}.jpg"
        filepath = os.path.join("public/media", filename)
        data = base64.b64decode(b64)
        with open(filepath, "wb") as out:
            out.write(data)
        team_manifest.append({"id": i+1, "slug": name_slug, "filename": filename, "alt": alt, "src": f"/media/{filename}"})
        saved_count += 1
    print(f"  Saved {len(team_manifest)} team images to public/media/")

    # Save home preview images
    for i, (b64, alt) in enumerate(home_matches[:4]):
        filename = f"home-{i+1}.jpg"
        filepath = os.path.join("public/media", filename)
        data = base64.b64decode(b64)
        with open(filepath, "wb") as out:
            out.write(data)

    # 4. Extract Posts / Articles Data
    print("Extracting articles...")
    beitraege_match = re.search(r'window\.GSLBeitraege\s*=\s*(\[.*?\]);\s*var', html, re.DOTALL)
    if beitraege_match:
        raw_json = beitraege_match.group(1)
        posts_data = json.loads(raw_json)
        # Assign slug and thumbnail to each post
        slugs = [
            "warum-ich-als-neue-hier-schreibe",
            "zellstoff-die-stille-hauptladung",
            "warum-baltimore-und-wilmington",
            "ein-tag-mit-port-services-in-brake",
            "charter-party-in-fuenf-absaetzen",
            "stahl-coils-auf-handysize"
        ]
        for idx, post in enumerate(posts_data):
            post["slug"] = slugs[idx] if idx < len(slugs) else f"post-{idx+1}"
            post["thumbnail"] = f"/media/news-{idx+1}.jpg"
            post["alt"] = news_manifest[idx]["alt"] if idx < len(news_manifest) else post["titel"]

        with open("src/data/posts.json", "w", encoding="utf-8") as out:
            json.dump(posts_data, out, indent=2, ensure_ascii=False)
        print(f"  Saved {len(posts_data)} articles to src/data/posts.json")

    # 5. Extract Team Data
    print("Extracting team data...")
    # Find team members
    team_members = [
        {
            "name": "Lars Elkjaer",
            "role": "Managing Partner",
            "phone": "+49 421 3606 340",
            "mobile": "+49 162 1935 807",
            "email": "lars.elkjaer@gsl-germany.com",
            "photo": "/media/team-lars-elkjaer.jpg"
        },
        {
            "name": "Cord Jürgens",
            "role": "Director Logistics",
            "phone": "+49 421 3606 344",
            "mobile": "+49 172 1844 989",
            "email": "cord.juergens@gsl-germany.com",
            "photo": "/media/team-cord-juergens.jpg"
        },
        {
            "name": "Kai Jühdes",
            "role": "Senior Chartering Manager Breakbulk",
            "phone": "+49 421 3606 341",
            "mobile": "+49 172 5179 836",
            "email": "kai.juehdes@gsl-germany.com",
            "photo": "/media/team-kai-juehdes.jpg"
        },
        {
            "name": "Maureen I. Kobe",
            "role": "Customer Service Breakbulk",
            "phone": "+49 421 3606 350",
            "mobile": "+49 172 4436 025",
            "email": "maureen.kobe@gsl-germany.com",
            "photo": "/media/team-maureen-kobe.jpg"
        },
        {
            "name": "Sabine Krüger",
            "role": "Customer Service Breakbulk",
            "phone": "+49 421 3606 347",
            "mobile": "+49 172 4193 036",
            "email": "sabine.krueger@gsl-germany.com",
            "photo": "/media/team-sabine-krueger.jpg"
        },
        {
            "name": "Matthis Osmers",
            "role": "Customer Service",
            "phone": "+49 421 3606 343",
            "mobile": "",
            "email": "matthis.osmers@gsl-germany.com",
            "photo": "/media/team-matthis-osmers.jpg"
        },
        {
            "name": "Uwe M. Albrecht",
            "role": "Port Services · Brake",
            "phone": "+49 421 3606 243",
            "mobile": "+49 171 2863 562",
            "email": "uwe.albrecht@gsl-germany.com",
            "photo": "/media/team-uwe-albrecht.jpg"
        }
    ]
    with open("src/data/team.json", "w", encoding="utf-8") as out:
        json.dump(team_members, out, indent=2, ensure_ascii=False)
    print(f"  Saved {len(team_members)} team members to src/data/team.json")

    # 6. Extract Departures Data
    print("Extracting departures data...")
    # 3 upcoming departures for home page
    home_departures = [
        {
            "type": "Handysize Bulker",
            "voyage": "Reise 26-03",
            "loadingPort": "Brake",
            "laycan": "18. – 22. August",
            "status": "b-open",
            "statusLabel": "Buchung offen",
            "cutoff": "15.08.2026",
            "ports": [
                {"name": "Baltimore", "eta": "02. Sept"},
                {"name": "Wilmington", "eta": "06. Sept"},
                {"name": "Port Canaveral", "eta": "11. Sept"}
            ]
        },
        {
            "type": "Handysize Bulker",
            "voyage": "Reise 26-04",
            "loadingPort": "Brake",
            "laycan": "15. – 20. September",
            "status": "b-open",
            "statusLabel": "Buchung offen",
            "cutoff": "12.09.2026",
            "ports": [
                {"name": "Baltimore", "eta": "30. Sept"},
                {"name": "New Haven", "eta": "04. Okt"},
                {"name": "San Juan", "eta": "12. Okt"}
            ]
        },
        {
            "type": "Handysize Bulker",
            "voyage": "Reise 26-05",
            "loadingPort": "Brake",
            "laycan": "12. – 18. Oktober",
            "status": "b-ask",
            "statusLabel": "auf Anfrage",
            "cutoff": "09.10.2026",
            "ports": [
                {"name": "Baltimore", "eta": "28. Okt"},
                {"name": "Wilmington", "eta": "02. Nov"},
                {"name": "Lake Charles", "eta": "09. Nov"}
            ]
        }
    ]
    with open("src/data/departures.json", "w", encoding="utf-8") as out:
        json.dump(home_departures, out, indent=2, ensure_ascii=False)
    print("  Saved departures to src/data/departures.json")

    print("\nAll assets extracted successfully!")

if __name__ == "__main__":
    extract_all()
