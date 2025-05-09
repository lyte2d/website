
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
const USER_GUIDE = fs.readFileSync('./tmp/guide.html');
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
${USER_GUIDE}
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