# Timeline Assignment

## Description

This project implements a React component to visualize events on a timeline.

## Instructions

1. Clone the repository.
2. Install nvm (Node Version Manager) and use Node.js version 16.

### Installing nvm on macOS

1. Install `nvm` using Homebrew:
    ```sh
    brew install nvm
    ```
2. Create a directory for nvm:
    ```sh
    mkdir ~/.nvm
    ```
3. Add the following lines to your `~/.zshrc` or `~/.bash_profile`:
    ```sh
    export NVM_DIR="$HOME/.nvm"
    [ -s "/usr/local/opt/nvm/nvm.sh" ] && \. "/usr/local/opt/nvm/nvm.sh"
    ```
4. Source the profile file to load nvm:
    ```sh
    source ~/.zshrc  # or source ~/.bash_profile
    ```
5. Install and use Node.js version 16:
    ```sh
    nvm install 16
    nvm use 16
    ```

### Installing nvm on Windows

1. Download and install nvm-windows from the [nvm-windows GitHub repository](https://github.com/coreybutler/nvm-windows/releases).
2. Open Command Prompt or PowerShell and install Node.js version 16:
    ```sh
    nvm install 16
    nvm use 16
    ```

3. Run `npm install` to install dependencies.
4. Run `npm start` to start the application.

## Time Spent

- Total time: ~4 hours.

## Highlights of the Implementation

- Compact design and layout of events on the timeline.
- Use of flexbox and CSS for efficient layout.
- Dynamic calculation of event positions and sizes.

## Future Improvements

- Allow zooming in and out of the timeline.
- Enable drag-and-drop to change event start and end dates.
- Allow inline editing of event names.

## Design Decisions

- Other timelines were used as inspiration for the design and layout.
- A clear and maintainable implementation was prioritized.

## Testing

- Given more time, unit and integration tests would be implemented to ensure component functionality.

## Sample Data

Sample data can be found in `src/timelineItems.js` and is used to render the timeline.
