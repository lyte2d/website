
// node js fs
const fs = require('fs');


function getExamples() {
    const names = [
        { title: "Hello World", app: "s01_hello" },
        { title: "Movement, Input", app: "s02_movement", },
        { title:  "Music, Pan, Pitch", app: "s03_music", },
        { title: "Sound FX", app:  "s04_soundfx", },
        { title: "Canvas", app:  "s05_canvas", },
        { title: "Basic Shader", app:  "s06_basic_shader", },
        { title: "Shader with samplers", app:  "s07_basic_shader2", },
        { title: "Shader + canvas", app:  "s09_shader_canvas", },
        { title: "Shader spin (ported from Love2D)", app:  "s08_shader_spinning_plus", },
        { title: "ImageBatch", app:  "s10_imagebatch", },
    ];

    // const examples = fs.readFileSync('./tmp/examples.html');
    let examples = "";
    names.forEach(({title, app}) => {
        const src = fs.readFileSync('./tmp/samples/' + app + '.lua');
        examples += `
<li id="${app}"><a target="none" onclick="on_examplelink_click(event, '${app}')" href="about:blank" class="menulink"> <div style="display: none;">
${src}
</div>${app}</a></li>`;
    })
    return examples;
}


// read API docs from ./lyte/lyte.d.ts file.
const API_DOCS = fs.readFileSync('./tmp/lyte.d.tl', 'utf8');
const EXAMPLES = getExamples();

const INDEX_HTML = `
<!--Generated.Do not edit manually! -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <meta charset="UTF-8" />
    <title>[Lyte2D] Home</title>
    <link rel="icon" type="image/png" href="public/icon.png" />
    <link href="public/prism.min.css" rel="stylesheet" />
    <link href="public/style.css" rel="stylesheet" />
    <script src="public/prism.min.js"></script>
    <script src="public/prism-lua.min.js"></script>
    <script src="public/prism-typescript.min.js"></script>
</head>

<body>
    <header id="top">
        <section class="container textcenter" style="padding-bottom: 10px; flex-direction: column"><a class="item"
                style="padding-top:10px; padding-left:10px;" href="index.html#top"><span class="logo">Lyte2D</span></a>
            <div class="item textcenter" style="padding-top:10px;"><a href="index.html#about"
                    class="menulink">About</a><span>| </span><a href="index.html#games"
                    class="menulink">Games</a><span>| </span><a href="index.html#examples"
                    class="menulink">Examples</a><span>| </span><a href="index.html#guide" class="menulink">User
                    guide</a><span>| </span><a href="index.html#api" class="menulink">API</a></div>
            <div class="item1"> </div>
        </section><a href="index.html#top" style="position:fixed; top: 25px; right: 20px;"><img src="public/icon.png"
                height="25px" /></a>
    </header>
    <main>
        <section id="about" class="sections">
            <div class="title">About</div>
            <p> Lyte2D is a simple, lightweight, free and opensource Lua framework for writing games. </p>
            <p> Lyte2D is inspired by LOVE2D.</p>
            <p> Hello world in Lyte2D: </p>
            <pre><code style="background-color:inherit" id="example-1" class="language-lua">function lyte.tick()
    lyte.draw_text("Hello, world", 0, 0)
end
</code></pre>
            <script> Prism.highlightElement(document.getElementById("example-1")); </script>
            <p>Lyte2D is small (Windows and Linux binaries are each less than 2 MB zipped) and supports HTML5 by
                compiling into WASM.</p>
            <p style="color: brown;"> Lyte2D is currently "alpha" software.
                Unless you know what you're doing, you probably shouldn't use it in "production."
                But if you have some programming experience, especially with Lua you should be fine.
                As such, it's ready to use for experimentation and "jam" style games.
            </p>
            <p>Lyte2D works on Windows, Linux (including SteamDeck) and HTML5.</p><b>Downloads</b>
            <ul>
                <li>Binaries<a target="_blank" href="https://github.com/lyte2d/lyte2d/releases"
                        class="menulinkext">https://github.com/lyte2d/lyte2d/releases⧉</a></li>
                <li>Source snapshot<a target="_blank" href="https://github.com/lyte2d/lyte2d"
                        class="menulinkext">https://github.com/lyte2d/lyte2d⧉</a></li>
            </ul>
            <p>Once you download the binary zip, just put lyte.exe somewhere in your path (or in a local directory where
                you'll write your game.)</p>
        </section>
        <section id="games" class="sections">
            <div class="title">Games</div>
            <p></p><b>Some games made with Lyte2D</b>
            <ul>
                <li><b>Sketchy Marathon (Steam)</b> is on<a target="_blank"
                        href="https://store.steampowered.com/app/3235640/Sketchy_Marathon"
                        class="menulinkext">https://store.steampowered.com/app/3235640/Sketchy_Marathon⧉</a> where you
                    can buy the game on Steam</li>
                <li><b>Sketchy Marathon (Demo)</b> is on<a target="_blank"
                        href="https://zorbn.itch.io/sketchy-marathon-demo"
                        class="menulinkext">https://zorbn.itch.io/sketchy-marathon-demo⧉</a> where you can play on your
                    browser, download a binary</li>
                <li><b>Pong Out (Jam Game)</b> is on<a target="_blank" href="https://m04r.itch.io/pong-out"
                        class="menulinkext">https://m04r.itch.io/pong-out⧉</a> where you can play on your browser,
                    download a binary or just download the sources</li>
                <li><b>Omua War (Jam Game)</b> is on<a target="_blank" href="https://m04r.itch.io/omua-war"
                        class="menulinkext">https://m04r.itch.io/omua-war⧉</a> where you can play on your browser</li>
            </ul>
        </section>
        <section id="examples" class="sections">
            <div class="title">Examples</div>
            <p>Note: Both canvas and code areas are resizable. You can also open the canvas area in a full browser tab.
            </p>
            <div class="dropdown">
                <div><button id="dropdownMenuButton" onclick="toggleDropdownMenu()" type="button"
                        class="dropdown-toggle">Examples ▼</button><span id="examplename"></span><a target="_blank"
                        href="" id="examplenewlink" class="menulink"></a></div>
                <ul id="examplesdropdown" class="dropdown-menu">
                    <li><a target="none" onclick="on_examplelink_click(event, 'empty')" href="about:blank"
                            class="menulink">
                            <div style="display: none;"></div>(None)
                        </a>
                    </li>

${EXAMPLES}

                </ul>
            </div>
            <div class="resizer ugly"><iframe class="resized lyte-iframe" name="demos" id="demosiframe"
                    title="demos"></iframe></div>
            <div class="resizer2 ugly">
                <div class="resized source-area">
                    <pre><code id="examplecode" class="language-lua"></code></pre>
                </div>
            </div>
        </section>
        <section id="guide" class="sections">
            <div class="title">User guide</div>
            <p></p><b>Get started</b>
            <p>Download the executable and place it somewhere in your path. 'lyte.exe' (or 'lyte' on linux) is assumed
                to be in your path.</p>
            <ul>
                <li>Create an <code>app.lua</code> file.</li>
                <li>Implement <code>lyte.tick</code> function. (See examples) </li>
                <li>Make sure you're in the same directory in your shell/cmd window</li>
                <li>Start your game with <code>lyte</code>.</li>
            </ul><b>Want to run some code in another location?</b>
            <ul>
                <li>If you want to use another directory as the base, you can do
                    <code>lyte dir=../my_games/testgame</code> </li>
                <li>If you want to use another file as your 'main' file, you can do <code>lyte app=myapp</code>,
                    assuming you have 'myapp.lua' in the current directory. You should NOT specify the extension</li>
                <li><code>dir=...</code> and <code>app=...</code> arguments can be combined to run a file in an
                    arbitrary directory</li>
            </ul><b>Package your game once you're ready.</b>
            <ul>
                <li>Ready to share your game with others? Cool!</li>
                <li>Create an 'app.zip' file. Inside the zip, 'app.lua' should be at the root/topmost location</li>
                <li>Copy 'lyte.exe', and rename it to 'mygame.exe' (swap 'mygame' for your chosen binary name)</li>
                <li>Alternatively, consider using 'lyte_gui.exe' on Windows, for no-console launch</li>
                <li>Running <code>mygame</code> will automatically load app.zip if it's in the same directory.</li>
                <li>Option 1: you can share the exe and the zip file, and your players can play it as it is</li>
                <li>Option 2: Fuse your app (next section.)</li>
            </ul><b>App 'fusing'</b>
            <ul>
                <li>Lyte2D support LOVE2D style app fusing. Basically you merge the exe and the zip files into a single
                    binary that will contain everything needed to run your code.</li>
                <li>On linux you can do <code>cat lyte.exe app.zip > mygame.exe</code>. Then just distribute
                    'mygame.exe' however you'd like.</li>
                <li>Similar on Windows. (...to be documented, in the meantime see LOVE2D docs.)</li>
            </ul><b>Configuring your app.</b>
            <ul>
                <li>If you'd like to configure your window size, fullscreen, etc. before the app loads, you can create a
                    'config.lua' file next to your 'app.lua'. Here's an example config.lua file: </li>
                <pre><code style="background-color:inherit" id="cfg-1" class="language-lua">return {
            window_width = 800,
            window_height = 500,
            window_title = "my game",
            fullscreen = false,
            window_vsync = true,
            default_filtermode = "nearest", --linear
    default_blendmode = "blend",
  }
        </code></pre>
                <script> Prism.highlightElement(document.getElementById("cfg-1")); </script>
                <li>Note: you need to keep this file next to the zip or exe file if you fuse your app</li>
            </ul><b>HTML5 -- browser games!</b>
            <ul>
                <li>Lyte2D has WASM builds! Just put your "app.zip" file next to the HTML5 files. (lyte.html, lyte.js,
                    lyte.wasm).</li>
                <li>Rename 'lyte.html' to suit your needs. And put all four files up on a static host (itch.io, github
                    pages, etc.)</li>
            </ul><b>'Advanced' features</b>
            <ul>
                <li>You can get to a REPL to inspect/edit your game real time. Start with <code>lyte repl=lua</code>.
                </li>
                <li>In REPL mode, you can stop the game anytime, inspect/change global variables, and do whatever before
                    continuing the game.</li>
                <li>On Windows just typing a letter will pause the game. And you can start using lyte as a Lua REPL.
                </li>
                <li>Similar on Linux, however the key is not captured. So after the first key (any key), you can type
                    the commands.</li>
                <li>Hit enter on an empty line to unpause the game loop.</li>
            </ul><b>Known issues with alpha</b>
            <ul>
                <li>Functions do not have default arguments, so all arguments must be passed to each function. This will
                    be fixed in a later release.</li>
                <li>Line/Circle drawing can have minor issues with very small sizes.</li>
                <li>Font rendering can have minor issues</li>
                <li>Browser version has rendering problems with pixels. Desktop versions look much better</li>
                <li>Browser version has issues, especially delays, with audio rendering. Desktop versions are much
                    better</li>
                <li>Firefox has some issues with some shader features, while Edge/Chrome work fine</li>
                <li>There could be lurking bugs in native code (alpha software.)</li>
                <li>REPL does not provide code-completions yet (although the machinery is there.)</li>
                <li>Missing features (coming up in later releases): physics, networking, native UI etc.</li>
            </ul>
        </section>
        <section id="api" class="sections">
            <div class="title">API</div>
            <p>Note: some of the experimental APIs are not documented.</p>
            <div class="api">
<pre><code style="background-color:inherit" id="code-api" class="language-typescript">
${API_DOCS}
</code></pre>
<script> Prism.highlightElement(document.getElementById("code-api")); </script>
            </div>
        </section>
        <script>            function toggleDropdownMenu() {
                let dropdownMenu = document.querySelector(".dropdown-menu");
                if (dropdownMenu.style.display === "block") {
                    dropdownMenu.style.display = "none";
                } else {
                    dropdownMenu.style.display = "block";
                }
            }

            function closeDropdownMenu() {
                let dropdownMenu = document.querySelector(".dropdown-menu");
                dropdownMenu.style.display = "none";
            }

            function on_examplelink_click(ev, app) {
                ev.preventDefault();

                let el_iframe = document.getElementById('demosiframe');
                el_iframe.setAttribute("src", app === "empty" ? "" : "lyte.html?zip=examples.zip&app=" + app);

                closeDropdownMenu();

                let el_code = document.getElementById("examplecode");
                el_code.innerHTML = ev.target.children[0].innerText;
                Prism.highlightElement(el_code);

                document.getElementById("examplename").innerText = app === "empty" ? "" : " " + app + " ";
                let el_newlink = document.getElementById("examplenewlink");
                el_newlink.innerText = app === "empty" ? "" : "Open in new tab";
                el_newlink.setAttribute("href", "lyte.html?zip=examples.zip&app=" + app);
            }

        </script>
    </main>
    <footer>
        <div class="textcenter">(c) moreward<a target="_blank" href="https://morew4rd.com"
                class="menulinkext">web⧉</a><a target="_blank" href="https://twitter.com/morew4rd"
                class="menulinkext">twitter⧉</a><a target="_blank" href="https://github.com/morew4rd"
                class="menulinkext">github⧉</a><a target="_blank" href="https://morew4rd.itcH.io"
                class="menulinkext">itch.io⧉</a></div>
    </footer>
</body>
<script src="https://www.googletagmanager.com/gtag/js?id=G-ZCQ9FCCMV2"></script>
<script>  window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());

    gtag('config', 'G-ZCQ9FCCMV2');
</script>

</html>
`

console.log(INDEX_HTML)