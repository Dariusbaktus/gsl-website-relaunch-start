import os
import re

def main():
    with open("index.html", "r", encoding="utf-8") as f:
        html = f.read()

    os.makedirs("src/styles", exist_ok=True)

    # 1. fonts.css
    fonts_css = """@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/dm-sans-700.woff2') format('woff2');
}
@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url('/fonts/dm-sans-800.woff2') format('woff2');
}
@font-face {
  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url('/fonts/dm-sans-900.woff2') format('woff2');
}
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/inter-400.woff2') format('woff2');
}
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/fonts/inter-500.woff2') format('woff2');
}
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/fonts/inter-600.woff2') format('woff2');
}
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/inter-700.woff2') format('woff2');
}
"""
    with open("src/styles/fonts.css", "w", encoding="utf-8") as out:
        out.write(fonts_css)
    print("Saved src/styles/fonts.css")

    # 2. Extract styles 0, 2, 3, 4
    styles = list(re.finditer(r'<style[^>]*>(.*?)</style>', html, re.DOTALL))
    
    style0 = styles[0].group(1).strip()
    style2 = styles[2].group(1).strip()
    style3 = styles[3].group(1).strip()
    style4 = styles[4].group(1).strip()

    # Note: in Next.js multi-page App Router, .page { display:none } and .page.on { display:block }
    # should be adapted so that pages in App Router render naturally!
    # Let's keep .page { display: block } or ensure page containers are visible on their routes.
    
    global_css = f"""@import './fonts.css';

{style0}

/* In Next.js App Router, each route renders its own page container directly */
.page {{
  display: block !important;
}}

{style2}

{style3}

{style4}
"""

    with open("src/styles/global.css", "w", encoding="utf-8") as out:
        out.write(global_css)
    print("Saved src/styles/global.css")

if __name__ == "__main__":
    main()
