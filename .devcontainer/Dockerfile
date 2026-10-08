FROM node:22-bookworm

# Prevent interactive prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive
ENV SHELL=/bin/zsh
ENV COREPACK_HOME=/usr/local/share/corepack

# Install required CLI tools, build dependencies, and utilities
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    wget \
    jq \
    ripgrep \
    fd-find \
    unzip \
    openssh-client \
    less \
    git \
    zsh \
    build-essential \
    python3 \
    postgresql-client \
    sudo \
    ca-certificates \
    bubblewrap \
    && ln -sf /usr/bin/fdfind /usr/local/bin/fd \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Allow passwordless sudo for unprivileged node user
RUN echo "node ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/node \
    && chmod 0440 /etc/sudoers.d/node

# Set zsh as default shell for the node user
RUN chsh -s /bin/zsh node

# Enable Corepack and prepare pnpm
RUN mkdir -p /usr/local/share/corepack \
    && corepack enable \
    && corepack prepare pnpm@latest --activate \
    && pnpm --version \
    && chmod -R a+rX /usr/local/share/corepack

# Install OpenAI Codex CLI globally
RUN npm install -g @openai/codex \
    && codex --version

# Setup workspace directory and ensure correct user permissions
# Ensure node user owns npm global directories and binaries so global updates (e.g. Codex) can run without root
RUN mkdir -p /workspace /home/node/.cache /home/node/.local /home/node/.pnpm-store \
    && chown -R node:node /workspace /home/node /usr/local/lib/node_modules /usr/local/bin /usr/local/share

# Configure zsh default settings for node user
USER node
RUN cat << 'EOF' > /home/node/.zshrc
export HISTFILE=~/.zsh_history
export HISTSIZE=10000
export SAVEHIST=10000
setopt appendhistory autocd
PROMPT='%F{cyan}%n@devcontainer%f:%F{yellow}%~%f$ '
EOF

WORKDIR /workspace
