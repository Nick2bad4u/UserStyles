<h1>## File List</h1>

<p># Here is a list of files included in this repository:</p>

<div class="lazyload-placeholder" data-content="file-list-1" style="min-height: 400px;"></div>
<div class="lazyload-placeholder" data-content="file-list-2" style="min-height: 400px;"></div>
<div class="lazyload-placeholder" data-content="file-list-3" style="min-height: 400px;"></div>
<div class="lazyload-placeholder" data-content="file-list-4" style="min-height: 400px;"></div>
<div class="lazyload-placeholder" data-content="file-list-5" style="min-height: 400px;"></div>
<div class="lazyload-placeholder" data-content="file-list-6" style="min-height: 400px;"></div>
<div class="lazyload-placeholder" data-content="file-list-7" style="min-height: 400px;"></div>
<div class="lazyload-placeholder" data-content="file-list-8" style="min-height: 400px;"></div>
<div class="lazyload-placeholder" data-content="file-list-9" style="min-height: 400px;"></div>
<script>
document.addEventListener("DOMContentLoaded", function() {
    const lazyLoadElements = document.querySelectorAll('.lazyload-placeholder');

    if ("IntersectionObserver" in window) {
        let rootMargin = '0px 0px 400px 0px';
        let threshold = 0.5;
        if (window.innerWidth <= 768) {  // Mobile devices
            rootMargin = '0px 0px 100px 0px';
            threshold = 0.1;
        } else if (window.innerWidth <= 1024) {  // Tablets
            rootMargin = '0px 0px 200px 0px';
            threshold = 0.3;
        } else if (window.innerWidth <= 1440) {  // Small desktops
            rootMargin = '0px 0px 300px 0px';
            threshold = 0.4;
        } else {  // Large desktops
            rootMargin = '0px 0px 400px 0px';
            threshold = 0.5;
        }
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let placeholder = entry.target;
                    let contentId = placeholder.dataset.content;
                    let file_list_html = '';
                    switch(contentId) {
                        case 'file-list-1':
                            file_list_html = `<ul><h2 style="color: #828b74;">Repo Root</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.black" style="color: #85c3ed;">.black</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.copilot-instructions.md" style="color: #96d34b;">.copilot-instructions.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.editorconfig" style="color: #808b44;">.editorconfig</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.gitignore" style="color: #35ecd9;">.gitignore</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.gitleaksignore" style="color: #9693a5;">.gitleaksignore</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.hintrc" style="color: #da9775;">.hintrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.jsbeautifyrc" style="color: #e68722;">.jsbeautifyrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.jscsrc" style="color: #d6c052;">.jscsrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.npmrc" style="color: #f18235;">.npmrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.pre-commit-config.yaml" style="color: #2ca956;">.pre-commit-config.yaml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.pre-commit-hooks.yaml" style="color: #a0ab21;">.pre-commit-hooks.yaml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierignore" style="color: #32f6b3;">.prettierignore</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierrc" style="color: #f39d81;">.prettierrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierrc.noplugins" style="color: #5cb6a2;">.prettierrc.noplugins</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierrc.temp" style="color: #e0ba99;">.prettierrc.temp</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.stylelintrc.json" style="color: #b08602;">.stylelintrc.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vale.ini" style="color: #a48bf4;">.vale.ini</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CNAME" style="color: #64b3f1;">CNAME</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CODE_OF_CONDUCT.md" style="color: #83b4e2;">CODE_OF_CONDUCT.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CONTRIBUTING.md" style="color: #63e272;">CONTRIBUTING.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Gemfile" style="color: #ed7c58;">Gemfile</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Gemfile.lock" style="color: #44e8cc;">Gemfile.lock</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/KudoAll-Strava-Garmin.user.test.cjs" style="color: #3fd1e1;">KudoAll-Strava-Garmin.user.test.cjs</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/LICENSE" style="color: #32c84c;">LICENSE</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Microsoft.PowerShell_profile.Tests.ps1" style="color: #43994e;">Microsoft.PowerShell_profile.Tests.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Microsoft.PowerShell_profile.ps1" style="color: #cf7c1f;">Microsoft.PowerShell_profile.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Microsoft.VSCode_profile.ps1" style="color: #ed8b90;">Microsoft.VSCode_profile.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures.html" style="color: #f5b643;">OldRedditNewProfilePictures.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PrettierFormatExcludePreprocessor.ps1" style="color: #a7cd4b;">PrettierFormatExcludePreprocessor.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Profile.ps1" style="color: #cfbdc7;">Profile.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/README.md" style="color: #b4aee9;">README.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SECURITY.md" style="color: #5fafad;">SECURITY.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify-local.html" style="color: #e88405;">beautify-local.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify.html" style="color: #af879e;">beautify.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/convertHexToRgba.html" style="color: #6b8bbb;">convertHexToRgba.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/cyclingCalculators.html" style="color: #ec7fa4;">cyclingCalculators.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/deno.json" style="color: #869722;">deno.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/deno.lock" style="color: #9d98a2;">deno.lock</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/eslint.config.mjs" style="color: #ab9307;">eslint.config.mjs</a></li></ul>`;
                            break;
                        case 'file-list-2':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/favicon.ico" style="color: #d79810;">favicon.ico</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/favicon.png" style="color: #b87fe3;">favicon.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/file_list.html" style="color: #7ee282;">file_list.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/file_list.md" style="color: #8ed2b2;">file_list.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/generate_gemfile.rb" style="color: #d083cc;">generate_gemfile.rb</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/jsconfig.json" style="color: #d19fa3;">jsconfig.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/package-lock.json" style="color: #9e8241;">package-lock.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/package.json" style="color: #f07916;">package.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/requirements.txt" style="color: #2e9cae;">requirements.txt</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/robots.txt" style="color: #e29a11;">robots.txt</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/sitemap.xml" style="color: #a792af;">sitemap.xml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/useragent-switcher-preferences.json" style="color: #abc8a9;">useragent-switcher-preferences.json</a></li>
<h2 style="color: #c47972;">Userstyles</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/17track.net-DarkMode.user.css" style="color: #7eb9b3;">17track.net-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ActivityFixDarkMode.user.css" style="color: #31ac5d;">ActivityFixDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Archive.orgNightTheme%28Updated%29.user.css" style="color: #67d35f;">Archive.orgNightTheme(Updated).user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Benjdd-dark.user.css" style="color: #85af49;">Benjdd-dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CFG.tf-DarkMode.user.css" style="color: #3ad531;">CFG.tf-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CSSGradient-DarkMode.user.css" style="color: #5594a7;">CSSGradient-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CSSPortal-Dark.user.css" style="color: #22f5e0;">CSSPortal-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Copilot-Microsoft-Blackmode.user.css" style="color: #24aca8;">Copilot-Microsoft-Blackmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CrystalMathLabs-BlackMode.user.css" style="color: #b36df6;">CrystalMathLabs-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/DCRainMaker-DarkMode.user.css" style="color: #45b020;">DCRainMaker-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Dearrow-RemoveDearrowButton.user.css" style="color: #ffa09c;">Dearrow-RemoveDearrowButton.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/DeepSeek-DarkMode.user.css" style="color: #639da1;">DeepSeek-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ESPN-DarkMode.user.css" style="color: #91bda9;">ESPN-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/FandomDark.user.css" style="color: #2396e4;">FandomDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Favero-DarkMode.user.css" style="color: #4ac510;">Favero-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Fedex.com-DarkMode.user.css" style="color: #46cdec;">Fedex.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/FitFileViewer-DarkTheme.user.css" style="color: #d4ac44;">FitFileViewer-DarkTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/FiveServer-DarkMode.user.css" style="color: #bfb809;">FiveServer-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GOTOES.org-DarkMode.user.css" style="color: #3492cd;">GOTOES.org-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GTBikeV-DarkMode.user.css" style="color: #f9b843;">GTBikeV-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminBadges-DarkMode.user.css" style="color: #55aa5e;">GarminBadges-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminConnectDark.user.css" style="color: #48ed35;">GarminConnectDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminRumors-DarkMode.user.css" style="color: #58e0fd;">GarminRumors-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GreasyForkDark.user.css" style="color: #5bc089;">GreasyForkDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Gyazo-DarkMode.user.css" style="color: #5dcc34;">Gyazo-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Kiwifarms-Black.user.css" style="color: #24e932;">Kiwifarms-Black.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Kiwifarms-Halloween.user.css" style="color: #56a49a;">Kiwifarms-Halloween.user.css</a></li></ul>`;
                            break;
                        case 'file-list-3':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Kiwifarms-Vaporwave.user.css" style="color: #9c79ad;">Kiwifarms-Vaporwave.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Klimat.app-DarkMode.user.css" style="color: #bf7f32;">Klimat.app-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MarkdownViewer%2B%2BTheme.user.css" style="color: #5b9b4f;">MarkdownViewer++Theme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Medicare-Gov-Dark-Mode.user.css" style="color: #a79265;">Medicare-Gov-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MyBikeTraffic-DarkMode.user.css" style="color: #ccbc5b;">MyBikeTraffic-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MyWorkoutCompanion-Dark.user.css" style="color: #54e466;">MyWorkoutCompanion-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Nascar.com-DarkMode.user.css" style="color: #43a04d;">Nascar.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/NewYorkerDarkMode.user.css" style="color: #579d9b;">NewYorkerDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/NewYorkerSimpleDarkMode.user.css" style="color: #d38e59;">NewYorkerSimpleDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRS-HiScores-BlackMode.user.css" style="color: #758cb9;">OSRS-HiScores-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWorldHeatmap-Dark.user.css" style="color: #6bc819;">OSRSWorldHeatmap-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OsrsWikiDarkMode.user.css" style="color: #29c862;">OsrsWikiDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Papertrails-DarkMode.user.css" style="color: #47a6a5;">Papertrails-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PathFinderW3School-Dark.user.css" style="color: #ce99c2;">PathFinderW3School-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PowerMeter.cc-DarkMode.user.css" style="color: #88bfdc;">PowerMeter.cc-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PromptHero-Dark.user.css" style="color: #fbc449;">PromptHero-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RedditColoredComments.user.css" style="color: #b1916c;">RedditColoredComments.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Scrap.tf-BlackTheme.user.css" style="color: #ecad32;">Scrap.tf-BlackTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Skial-CustomTheme.user.css" style="color: #ab8cda;">Skial-CustomTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SportSurge-BlackMode.user.css" style="color: #6e94bb;">SportSurge-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SquadRats-Dark.user.css" style="color: #dc7a57;">SquadRats-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Statshunters-Dark.user.css" style="color: #22cc07;">Statshunters-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamDB-Black-Mode.user.css" style="color: #3da0dd;">SteamDB-Black-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamDB-Dark-Mode.user.css" style="color: #47c0a1;">SteamDB-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Brawlhalla.user.css" style="color: #69d824;">SteamStat.us-Re-Remastered-Brawlhalla.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Christmas-Style.user.css" style="color: #e2cb1f;">SteamStat.us-Re-Remastered-Christmas-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Detroit-Lions-Style.user.css" style="color: #26c28d;">SteamStat.us-Re-Remastered-Detroit-Lions-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Detroit-Tigers.user.css" style="color: #ddc430;">SteamStat.us-Re-Remastered-Detroit-Tigers.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Easter-Style.user.css" style="color: #39a950;">SteamStat.us-Re-Remastered-Easter-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Green-BlackStyle.user.css" style="color: #f699df;">SteamStat.us-Re-Remastered-Green-BlackStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Halloween-Style.user.css" style="color: #2df71c;">SteamStat.us-Re-Remastered-Halloween-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Lime%20Green-Purple%20Style.user.css" style="color: #29b9cf;">SteamStat.us-Re-Remastered-Lime Green-Purple Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Miami-Heat.user.css" style="color: #27b362;">SteamStat.us-Re-Remastered-Miami-Heat.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-NASCAR.user.css" style="color: #fc7a31;">SteamStat.us-Re-Remastered-NASCAR.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Orange-BlackStyle.user.css" style="color: #35e613;">SteamStat.us-Re-Remastered-Orange-BlackStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-PCMasterRace.user.css" style="color: #dfb25f;">SteamStat.us-Re-Remastered-PCMasterRace.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Pink-BlackStyle.user.css" style="color: #9ae418;">SteamStat.us-Re-Remastered-Pink-BlackStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Purple.user.css" style="color: #6292d3;">SteamStat.us-Re-Remastered-Purple.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-RainbowStyle.user.css" style="color: #89a8df;">SteamStat.us-Re-Remastered-RainbowStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-SteamStyle.user.css" style="color: #b1c976;">SteamStat.us-Re-Remastered-SteamStyle.user.css</a></li></ul>`;
                            break;
                        case 'file-list-4':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Sunset-Style.user.css" style="color: #dcb646;">SteamStat.us-Re-Remastered-Sunset-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-TeamFortress2.user.css" style="color: #67d88e;">SteamStat.us-Re-Remastered-TeamFortress2.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-The-Crew-Motorfest.user.css" style="color: #4e99dd;">SteamStat.us-Re-Remastered-The-Crew-Motorfest.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-TourDeFrance.user.css" style="color: #d3be71;">SteamStat.us-Re-Remastered-TourDeFrance.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-USA-Style.user.css" style="color: #f370cb;">SteamStat.us-Re-Remastered-USA-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Windows95.user.css" style="color: #bba2b1;">SteamStat.us-Re-Remastered-Windows95.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Witcher3.user.css" style="color: #6d9563;">SteamStat.us-Re-Remastered-Witcher3.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Wolverines-Style.user.css" style="color: #bc8b90;">SteamStat.us-Re-Remastered-Wolverines-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-WorldOfWarcraft.user.css" style="color: #fc6d4f;">SteamStat.us-Re-Remastered-WorldOfWarcraft.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Zwift.user.css" style="color: #6eaa8e;">SteamStat.us-Re-Remastered-Zwift.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered.user.css" style="color: #47c1b9;">SteamStat.us-Re-Remastered.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamTradeMatcher-DarkMode.user.css" style="color: #d3aaa6;">SteamTradeMatcher-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StepSecurityDarkMode.user.css" style="color: #6abc0c;">StepSecurityDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaAutoDarkTheme.user.css" style="color: #4794e0;">StravaAutoDarkTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaStratTracker-DarkMode.user.css" style="color: #d27c6b;">StravaStratTracker-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StreamingSitesStreamsBlackDarkMode.user.css" style="color: #b2a07e;">StreamingSitesStreamsBlackDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Stylus-DarkTheme-Updated.user.css" style="color: #3bf86e;">Stylus-DarkTheme-Updated.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StylusEditorChromeDark-Fixed.user.css" style="color: #c58ad9;">StylusEditorChromeDark-Fixed.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StylusFluent-Updated.user.css" style="color: #4ad067;">StylusFluent-Updated.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TamperMonkey-DarkGreen.user.css" style="color: #f1c737;">TamperMonkey-DarkGreen.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TamperMonkey-DarkMode.user.css" style="color: #b2d64a;">TamperMonkey-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TeamFortressWIki-Dark.user.css" style="color: #d5760c;">TeamFortressWIki-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TechPowerUp-DarkMode.user.css" style="color: #4ae945;">TechPowerUp-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TrainingPeaks-DarkMode.user.css" style="color: #abb695;">TrainingPeaks-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UPS.com-DarkMode.user.css" style="color: #ceb7ea;">UPS.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Unroll.me-DarkMode.user.css" style="color: #4c977c;">Unroll.me-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UptimeRobotDark.user.css" style="color: #25fd23;">UptimeRobotDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserStyle-Root-ColorTemplate.user.css" style="color: #d179d9;">UserStyle-Root-ColorTemplate.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserscriptTemplate.user.css" style="color: #30f40d;">UserscriptTemplate.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserscriptZone-Dark.user.css" style="color: #23dd64;">UserscriptZone-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserstyleWorld-DarkBamaBraves.user.css" style="color: #439ae2;">UserstyleWorld-DarkBamaBraves.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/VisualStudioCode-DarkMode.user.css" style="color: #b8838b;">VisualStudioCode-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/WahooFitnessDarkMode.user.css" style="color: #74c7d0;">WahooFitnessDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Walmart.com-DarkMode.user.css" style="color: #44c0bf;">Walmart.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wanderer-Dark.user.css" style="color: #ee752c;">Wanderer-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Weather.com-DarkMode.user.css" style="color: #42abec;">Weather.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/WebHint-Dark.user.css" style="color: #6bd630;">WebHint-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wigle-DarkMode-Beta.user.css" style="color: #c4a9f6;">Wigle-DarkMode-Beta.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wigle-DarkMode.user.css" style="color: #5eacda;">Wigle-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wikipedia-OLED-SettingsPage.user.css" style="color: #9dc8f3;">Wikipedia-OLED-SettingsPage.user.css</a></li></ul>`;
                            break;
                        case 'file-list-5':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Windy-DarkMode.user.css" style="color: #6eae7f;">Windy-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YT-Vibra.user.css" style="color: #3bfc0d;">YT-Vibra.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeRainbowProgress.user.css" style="color: #3cdf44;">YoutubeRainbowProgress.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeScrubberColors.user.css" style="color: #cba258;">YoutubeScrubberColors.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeTV-BlackMode.user.css" style="color: #67c167;">YoutubeTV-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Zwift.com-Dark-Mode.user.css" style="color: #c2a928;">Zwift.com-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwiftHacks-DarkMode.user.css" style="color: #6b9d8e;">ZwiftHacks-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwiftInsiderDarkMode.user.css" style="color: #efacb0;">ZwiftInsiderDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwiftPower.comDark%20Mode.user.css" style="color: #84ae54;">ZwiftPower.comDark Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Zwiftalizer.com-Darker-Mode.user.css" style="color: #849089;">Zwiftalizer.com-Darker-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwifterBikesDarkMode.user.css" style="color: #88b408;">ZwifterBikesDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/abcnews.go.com-DarkMode.user.css" style="color: #989ff5;">abcnews.go.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/bicycling-DarkMode.user.css" style="color: #ce8c1b;">bicycling-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/detroitmi.gov-DarkMode.user.css" style="color: #7bced7;">detroitmi.gov-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ebay-Dark-Mode.user.css" style="color: #acd109;">ebay-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/findthatride-darkmode.user.css" style="color: #9cd638;">findthatride-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/fitfiletools-darkmode.user.css" style="color: #b47b41;">fitfiletools-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/fivethirtyeight.comDarkMode.user.css" style="color: #f196e4;">fivethirtyeight.comDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/jalopnik.com-DarkMode.user.css" style="color: #fe59ec;">jalopnik.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/kom.club-darkmode.user.css" style="color: #f7ba4e;">kom.club-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/makinolo.com-Dark-Mode.user.css" style="color: #56c663;">makinolo.com-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/michigan.gov-DarkMode.user.css" style="color: #da8765;">michigan.gov-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/mywindsock-darkmode.user.css" style="color: #afabb4;">mywindsock-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/nbcwashington.com-DarkMode.user.css" style="color: #b3b0d6;">nbcwashington.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/nytimes.com-DarkModeSimple.user.css" style="color: #7caee4;">nytimes.com-DarkModeSimple.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/p337info-tf2.user.css" style="color: #d99104;">p337info-tf2.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/runalyze-darkmode.user.css" style="color: #29b3ac;">runalyze-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/stravatoolbox-darkmode.user.css" style="color: #45c7b2;">stravatoolbox-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/veloviewer-darkmode.user.css" style="color: #40f144;">veloviewer-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/zwifthub.com-darkmode.user.css" style="color: #e36a76;">zwifthub.com-darkmode.user.css</a></li>
<h2 style="color: #bf9c7b;">Userscripts</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/AscentDescentMetersToFeet.user.js" style="color: #5dd767;">AscentDescentMetersToFeet.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/AutoMergeDependabotPRs.user.js" style="color: #acce7d;">AutoMergeDependabotPRs.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/DeleteYoutubePlaylists.user.js" style="color: #42d6f0;">DeleteYoutubePlaylists.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnhanceYouTubeProfilePictures.user.js" style="color: #86d2f0;">EnhanceYouTubeProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnlargeKiwifarmsProfilePictures.user.js" style="color: #67c276;">EnlargeKiwifarmsProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnlargeYouTubeChatProfilePictures.user.js" style="color: #dec308;">EnlargeYouTubeChatProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnlargeYouTubeCommentSectionProfilePictures.user.js" style="color: #3ccd08;">EnlargeYouTubeCommentSectionProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GOTOESFitFileEditor-AutoClosePopup.user.js" style="color: #57c5f6;">GOTOESFitFileEditor-AutoClosePopup.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminConnectRemoveGear.user.js" style="color: #92a8fd;">GarminConnectRemoveGear.user.js</a></li></ul>`;
                            break;
                        case 'file-list-6':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GithubMarkMergedDone.user.js" style="color: #e7a7ea;">GithubMarkMergedDone.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GyazoDirectLink.user.js" style="color: #b1af9d;">GyazoDirectLink.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/HideChineseUserstyles.user.js" style="color: #e97807;">HideChineseUserstyles.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/HideNon-EnglishUserstyles.user.js" style="color: #4ad16f;">HideNon-EnglishUserstyles.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/KudoAll-Strava-Garmin.user.js" style="color: #6df00a;">KudoAll-Strava-Garmin.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MergeDependabotPRs.user.js" style="color: #8da9a7;">MergeDependabotPRs.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWikiAuto-Categorizer-SlowMode.user.js" style="color: #dd8fcf;">OSRSWikiAuto-Categorizer-SlowMode.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWikiAuto-Categorizer.user.js" style="color: #7ba64a;">OSRSWikiAuto-Categorizer.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWikiAuto-Navbox-SlowMode.user.js" style="color: #44c185;">OSRSWikiAuto-Navbox-SlowMode.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-API-Key-Version-Reddit-Only-Version.user.js" style="color: #30b101;">OldRedditNewProfilePictures-API-Key-Version-Reddit-Only-Version.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-API-Key-Version-Reddit-Stream-Version.user.js" style="color: #bac46b;">OldRedditNewProfilePictures-API-Key-Version-Reddit-Stream-Version.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-API-Key-Version.user.js" style="color: #47ac7f;">OldRedditNewProfilePictures-API-Key-Version.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-UniversalVersion.user.js" style="color: #b0be21;">OldRedditNewProfilePictures-UniversalVersion.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures.user.js" style="color: #aca069;">OldRedditNewProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures/Old%20Reddit%20with%20New%20Profile%20Pictures.user.js" style="color: #b59cf2;">OldRedditNewProfilePictures/Old Reddit with New Profile Pictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RedditStreamAutoRefresher.user.js" style="color: #949cfe;">RedditStreamAutoRefresher.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RedditStreamAutoRefresherFaster.user.js" style="color: #3ee6ae;">RedditStreamAutoRefresherFaster.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RightClickEnable.user.js" style="color: #3ac206;">RightClickEnable.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaAutoAuthorize.user.js" style="color: #3af414;">StravaAutoAuthorize.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaTextAuto-Selector.user.js" style="color: #6b9fde;">StravaTextAuto-Selector.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SuperchargedLocalDirectoryWebUI.user.js" style="color: #94bec7;">SuperchargedLocalDirectoryWebUI.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserstyleWorld-SyncStyles.user.js" style="color: #7f8193;">UserstyleWorld-SyncStyles.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTV-Volume-Rememberer.user.js" style="color: #dd7714;">YouTubeTV-Volume-Rememberer.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl.user.js" style="color: #90d1a0;">YouTubeTVVolumeControl.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl.user.js" style="color: #81a5b6;">YouTubeVolumeControl.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeVolumeDisplay.user.js" style="color: #c4d51e;">YoutubeVolumeDisplay.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Zwift-Give-RideOns-to-Everyone.user.js" style="color: #a5879e;">Zwift-Give-RideOns-to-Everyone.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/reddit-stream-Enhancements.user.js" style="color: #a3758d;">reddit-stream-Enhancements.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-Add-Balance-Original.user.js" style="color: #a89056;">strava-balance/Strava-Add-Balance-Original.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-Add-Balance-Updated.user.js" style="color: #a7d495;">strava-balance/Strava-Add-Balance-Updated.user.js</a></li>
<h2 style="color: #448df8;">CSS</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Discord-Dark%2B-Default-Member-List.css" style="color: #899875;">Discord-Dark+-Default-Member-List.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/styles.css" style="color: #79b0c4;">YouTubeVolumeControl/styles.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.css" style="color: #77dfbb;">codemirror.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.min.css" style="color: #ca8ab1;">codemirror.min.css</a></li>
<h2 style="color: #69ba3d;">JavaScript</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.eslintrc.js" style="color: #c7b0ed;">.eslintrc.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/background.js" style="color: #5cb8ca;">SteamCookieExtractor2/background.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/content.js" style="color: #51e35f;">SteamCookieExtractor2/content.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/options.js" style="color: #6ada84;">SteamCookieExtractor2/options.js</a></li></ul>`;
                            break;
                        case 'file-list-7':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/popup.js" style="color: #efbaaf;">SteamCookieExtractor2/popup.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/WIndyPlugin.min.js" style="color: #26f0b7;">WIndyPlugin.min.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/background.js" style="color: #b1d854;">YouTubeTVVolumeControl/background.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/content.js" style="color: #54f05a;">YouTubeTVVolumeControl/content.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/background.js" style="color: #c7705c;">YouTubeVolumeControl/background.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/content.js" style="color: #faaa76;">YouTubeVolumeControl/content.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify-css-mod.js" style="color: #39bd2f;">beautify-css-mod.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify.js" style="color: #d0bf3f;">beautify.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.js" style="color: #f36c7a;">codemirror.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.min.js" style="color: #f1c02b;">codemirror.min.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/convertHexToRgba.js" style="color: #5ddb54;">convertHexToRgba.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/css.js" style="color: #32a5b9;">css.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/css.min.js" style="color: #2ff354;">css.min.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/cyclingCalculators.js" style="color: #a9a5d6;">cyclingCalculators.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-AddBalance-Updated.js" style="color: #40fa4b;">strava-balance/Strava-AddBalance-Updated.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-AddBalance.js" style="color: #8edc7a;">strava-balance/Strava-AddBalance.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/binary-Updated.js" style="color: #c383f6;">strava-balance/binary-Updated.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/binary.js" style="color: #d27ed6;">strava-balance/binary.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/buffer-5.6.1/base64-js-1.3.1/index.js" style="color: #95a57a;">strava-balance/buffer-5.6.1/base64-js-1.3.1/index.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/buffer-5.6.1/ieee754-1.1.13/index.js" style="color: #74cb7e;">strava-balance/buffer-5.6.1/ieee754-1.1.13/index.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/buffer-5.6.1/index.js" style="color: #af74ed;">strava-balance/buffer-5.6.1/index.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/fit-parser-Updated.js" style="color: #43ef5d;">strava-balance/fit-parser-Updated.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/fit-parser.js" style="color: #e48ccd;">strava-balance/fit-parser.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/fit.js" style="color: #62ab29;">strava-balance/fit.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/messages.js" style="color: #80dca6;">strava-balance/messages.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/strava-fit-parser.js" style="color: #8c903d;">strava-balance/strava-fit-parser.js</a></li>
<h2 style="color: #56b5b3;">YAML</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/dependabot.yml" style="color: #6fa9ca;">.github/dependabot.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/labeler.yml" style="color: #f38790;">.github/labeler.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/ActionLint.yml" style="color: #e49de3;">.github/workflows/ActionLint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/Bandit.yml" style="color: #e476c1;">.github/workflows/Bandit.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/Snake.yml" style="color: #a49294;">.github/workflows/Snake.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/black-formatter.yml" style="color: #eca7c0;">.github/workflows/black-formatter.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/codeql.yml" style="color: #b277d5;">.github/workflows/codeql.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/defender.yml" style="color: #adb65d;">.github/workflows/defender.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/deno.yml" style="color: #6bd44b;">.github/workflows/deno.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/dependency-review.yml" style="color: #ae874b;">.github/workflows/dependency-review.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/devskim.yml" style="color: #89cc3b;">.github/workflows/devskim.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/eslint.yml" style="color: #a7c376;">.github/workflows/eslint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/generate-file-list.yml" style="color: #82ac0d;">.github/workflows/generate-file-list.yml</a></li></ul>`;
                            break;
                        case 'file-list-8':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/greetings.yml" style="color: #e17309;">.github/workflows/greetings.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/label.yml" style="color: #38da70;">.github/workflows/label.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/ossar.yml" style="color: #d59b77;">.github/workflows/ossar.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/osv-scanner.yml" style="color: #a1ae3d;">.github/workflows/osv-scanner.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/scorecards.yml" style="color: #cc7136;">.github/workflows/scorecards.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/semgrep.yml" style="color: #22a93f;">.github/workflows/semgrep.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/sitemap.yml" style="color: #7ccf45;">.github/workflows/sitemap.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/sobelow.yml" style="color: #b2b248;">.github/workflows/sobelow.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/stale.yml" style="color: #39a327;">.github/workflows/stale.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/static.yml" style="color: #7a847e;">.github/workflows/static.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/stylelint.yml" style="color: #ccc489;">.github/workflows/stylelint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/super-linter.yml" style="color: #78f10a;">.github/workflows/super-linter.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.markdownlint.yml" style="color: #7ce00f;">.markdownlint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.scss-lint.yml" style="color: #6f8ecb;">.scss-lint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/_config.yml" style="color: #e1c94f;">_config.yml</a></li>
<h2 style="color: #67c7c4;">.github/ISSUE_TEMPLATE</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/ISSUE_TEMPLATE/bug_report.md" style="color: #26b78f;">.github/ISSUE_TEMPLATE/bug_report.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/ISSUE_TEMPLATE/feature_request.md" style="color: #46ec5f;">.github/ISSUE_TEMPLATE/feature_request.md</a></li>
<h2 style="color: #c6bd69;">.github/PULL_REQUEST_TEMPLATE</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/PULL_REQUEST_TEMPLATE/pull_request_template.md" style="color: #78ee13;">.github/PULL_REQUEST_TEMPLATE/pull_request_template.md</a></li>
<h2 style="color: #c8bc95;">.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/bug_report.md" style="color: #43eda5;">.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/bug_report.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/feature_request.md" style="color: #8eb489;">.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/feature_request.md</a></li>
<h2 style="color: #e8bf6d;">.vscode</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/generate_file_list.py" style="color: #f2b064;">.vscode/generate_file_list.py</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/launch.json" style="color: #938837;">.vscode/launch.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/settings.json" style="color: #e6ab65;">.vscode/settings.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/tasks.json" style="color: #81cc93;">.vscode/tasks.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/test_generate_file_list.py" style="color: #79a78a;">.vscode/test_generate_file_list.py</a></li>
<h2 style="color: #c2b5d4;">OldRedditNewProfilePictures</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures/Old%20Reddit%20with%20New%20Profile%20Pictures.options.json" style="color: #a7cc8a;">OldRedditNewProfilePictures/Old Reddit with New Profile Pictures.options.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures/Old%20Reddit%20with%20New%20Profile%20Pictures.storage.json" style="color: #de8b06;">OldRedditNewProfilePictures/Old Reddit with New Profile Pictures.storage.json</a></li>
<h2 style="color: #bb82fc;">SteamCookieExtractor2</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/manifest.json" style="color: #a7bce6;">SteamCookieExtractor2/manifest.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/options.html" style="color: #6bc974;">SteamCookieExtractor2/options.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/popup.html" style="color: #81ae34;">SteamCookieExtractor2/popup.html</a></li>
<h2 style="color: #3eeac9;">SteamCookieExtractor2/icons</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/icon128.png" style="color: #9aa2dc;">SteamCookieExtractor2/icons/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/icon16.png" style="color: #b2b057;">SteamCookieExtractor2/icons/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/icon48.png" style="color: #e8818f;">SteamCookieExtractor2/icons/icon48.png</a></li></ul>`;
                            break;
                        case 'file-list-9':
                            file_list_html = `<ul><h2 style="color: #fdb8a0;">SteamCookieExtractor2/icons/images</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/images/icon128.png" style="color: #a56aed;">SteamCookieExtractor2/icons/images/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/images/icon16.png" style="color: #848865;">SteamCookieExtractor2/icons/images/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/images/icon48.png" style="color: #64db31;">SteamCookieExtractor2/icons/images/icon48.png</a></li>
<h2 style="color: #c5d023;">YouTubeTVVolumeControl</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/icon128.png" style="color: #55bbfe;">YouTubeTVVolumeControl/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/icon16.png" style="color: #ba93b4;">YouTubeTVVolumeControl/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/icon48.png" style="color: #55a67a;">YouTubeTVVolumeControl/icon48.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/manifest.json" style="color: #abbe22;">YouTubeTVVolumeControl/manifest.json</a></li>
<h2 style="color: #7890a7;">YouTubeVolumeControl</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icon128.png" style="color: #93bf65;">YouTubeVolumeControl/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icon16.png" style="color: #37b96c;">YouTubeVolumeControl/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icon48.png" style="color: #f0aa5d;">YouTubeVolumeControl/icon48.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/manifest.json" style="color: #5c9a3e;">YouTubeVolumeControl/manifest.json</a></li>
<h2 style="color: #5da7b4;">YouTubeVolumeControl/icons</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/icon128.png" style="color: #e29af4;">YouTubeVolumeControl/icons/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/icon16.png" style="color: #e6b416;">YouTubeVolumeControl/icons/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/icon48.png" style="color: #26cf95;">YouTubeVolumeControl/icons/icon48.png</a></li>
<h2 style="color: #3ab157;">YouTubeVolumeControl/icons/images</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/images/icon128.png" style="color: #8a90c1;">YouTubeVolumeControl/icons/images/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/images/icon16.png" style="color: #89dc54;">YouTubeVolumeControl/icons/images/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/images/icon48.png" style="color: #ab93dd;">YouTubeVolumeControl/icons/images/icon48.png</a></li>
<h2 style="color: #39eb78;">assets</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-city-background.png" style="color: #b8a193;">assets/kiwi-city-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-default-background.png" style="color: #6ca198;">assets/kiwi-default-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-flower-background.png" style="color: #ffa81c;">assets/kiwi-flower-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-green-background.png" style="color: #d9a708;">assets/kiwi-green-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-purple-background.png" style="color: #f79810;">assets/kiwi-purple-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-space-apple-background.png" style="color: #b2b818;">assets/kiwi-space-apple-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-swirls-background.png" style="color: #df916c;">assets/kiwi-swirls-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-trees-background.png" style="color: #45f120;">assets/kiwi-trees-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-vaporwave-logo.png" style="color: #93d01f;">assets/kiwi-vaporwave-logo.png</a></li>
<h2 style="color: #79bc71;">src</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/src/generate_file_list.py" style="color: #3bbd4c;">src/generate_file_list.py</a></li></ul>`;
                            break;
                    }
                    placeholder.innerHTML = file_list_html;
                    observer.unobserve(placeholder);
                    console.log(`Loaded content for ${contentId}`);
                }
            });
        }, { rootMargin: rootMargin, threshold: threshold });

        lazyLoadElements.forEach(element => {
            element.style.marginTop = '-17px';
            observer.observe(element);
        });
    } else {
        lazyLoadElements.forEach(placeholder => {
            let contentId = placeholder.dataset.content;
            let file_list_html = '';
            switch(contentId) {
                case 'file-list-1':
                    file_list_html = `<ul><h2 style="color: #828b74;">Repo Root</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.black" style="color: #85c3ed;">.black</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.copilot-instructions.md" style="color: #96d34b;">.copilot-instructions.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.editorconfig" style="color: #808b44;">.editorconfig</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.gitignore" style="color: #35ecd9;">.gitignore</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.gitleaksignore" style="color: #9693a5;">.gitleaksignore</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.hintrc" style="color: #da9775;">.hintrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.jsbeautifyrc" style="color: #e68722;">.jsbeautifyrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.jscsrc" style="color: #d6c052;">.jscsrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.npmrc" style="color: #f18235;">.npmrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.pre-commit-config.yaml" style="color: #2ca956;">.pre-commit-config.yaml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.pre-commit-hooks.yaml" style="color: #a0ab21;">.pre-commit-hooks.yaml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierignore" style="color: #32f6b3;">.prettierignore</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierrc" style="color: #f39d81;">.prettierrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierrc.noplugins" style="color: #5cb6a2;">.prettierrc.noplugins</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierrc.temp" style="color: #e0ba99;">.prettierrc.temp</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.stylelintrc.json" style="color: #b08602;">.stylelintrc.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vale.ini" style="color: #a48bf4;">.vale.ini</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CNAME" style="color: #64b3f1;">CNAME</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CODE_OF_CONDUCT.md" style="color: #83b4e2;">CODE_OF_CONDUCT.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CONTRIBUTING.md" style="color: #63e272;">CONTRIBUTING.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Gemfile" style="color: #ed7c58;">Gemfile</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Gemfile.lock" style="color: #44e8cc;">Gemfile.lock</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/KudoAll-Strava-Garmin.user.test.cjs" style="color: #3fd1e1;">KudoAll-Strava-Garmin.user.test.cjs</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/LICENSE" style="color: #32c84c;">LICENSE</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Microsoft.PowerShell_profile.Tests.ps1" style="color: #43994e;">Microsoft.PowerShell_profile.Tests.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Microsoft.PowerShell_profile.ps1" style="color: #cf7c1f;">Microsoft.PowerShell_profile.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Microsoft.VSCode_profile.ps1" style="color: #ed8b90;">Microsoft.VSCode_profile.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures.html" style="color: #f5b643;">OldRedditNewProfilePictures.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PrettierFormatExcludePreprocessor.ps1" style="color: #a7cd4b;">PrettierFormatExcludePreprocessor.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Profile.ps1" style="color: #cfbdc7;">Profile.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/README.md" style="color: #b4aee9;">README.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SECURITY.md" style="color: #5fafad;">SECURITY.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify-local.html" style="color: #e88405;">beautify-local.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify.html" style="color: #af879e;">beautify.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/convertHexToRgba.html" style="color: #6b8bbb;">convertHexToRgba.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/cyclingCalculators.html" style="color: #ec7fa4;">cyclingCalculators.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/deno.json" style="color: #869722;">deno.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/deno.lock" style="color: #9d98a2;">deno.lock</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/eslint.config.mjs" style="color: #ab9307;">eslint.config.mjs</a></li></ul>`;
                    break;
                case 'file-list-2':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/favicon.ico" style="color: #d79810;">favicon.ico</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/favicon.png" style="color: #b87fe3;">favicon.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/file_list.html" style="color: #7ee282;">file_list.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/file_list.md" style="color: #8ed2b2;">file_list.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/generate_gemfile.rb" style="color: #d083cc;">generate_gemfile.rb</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/jsconfig.json" style="color: #d19fa3;">jsconfig.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/package-lock.json" style="color: #9e8241;">package-lock.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/package.json" style="color: #f07916;">package.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/requirements.txt" style="color: #2e9cae;">requirements.txt</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/robots.txt" style="color: #e29a11;">robots.txt</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/sitemap.xml" style="color: #a792af;">sitemap.xml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/useragent-switcher-preferences.json" style="color: #abc8a9;">useragent-switcher-preferences.json</a></li>
<h2 style="color: #c47972;">Userstyles</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/17track.net-DarkMode.user.css" style="color: #7eb9b3;">17track.net-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ActivityFixDarkMode.user.css" style="color: #31ac5d;">ActivityFixDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Archive.orgNightTheme%28Updated%29.user.css" style="color: #67d35f;">Archive.orgNightTheme(Updated).user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Benjdd-dark.user.css" style="color: #85af49;">Benjdd-dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CFG.tf-DarkMode.user.css" style="color: #3ad531;">CFG.tf-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CSSGradient-DarkMode.user.css" style="color: #5594a7;">CSSGradient-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CSSPortal-Dark.user.css" style="color: #22f5e0;">CSSPortal-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Copilot-Microsoft-Blackmode.user.css" style="color: #24aca8;">Copilot-Microsoft-Blackmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CrystalMathLabs-BlackMode.user.css" style="color: #b36df6;">CrystalMathLabs-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/DCRainMaker-DarkMode.user.css" style="color: #45b020;">DCRainMaker-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Dearrow-RemoveDearrowButton.user.css" style="color: #ffa09c;">Dearrow-RemoveDearrowButton.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/DeepSeek-DarkMode.user.css" style="color: #639da1;">DeepSeek-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ESPN-DarkMode.user.css" style="color: #91bda9;">ESPN-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/FandomDark.user.css" style="color: #2396e4;">FandomDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Favero-DarkMode.user.css" style="color: #4ac510;">Favero-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Fedex.com-DarkMode.user.css" style="color: #46cdec;">Fedex.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/FitFileViewer-DarkTheme.user.css" style="color: #d4ac44;">FitFileViewer-DarkTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/FiveServer-DarkMode.user.css" style="color: #bfb809;">FiveServer-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GOTOES.org-DarkMode.user.css" style="color: #3492cd;">GOTOES.org-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GTBikeV-DarkMode.user.css" style="color: #f9b843;">GTBikeV-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminBadges-DarkMode.user.css" style="color: #55aa5e;">GarminBadges-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminConnectDark.user.css" style="color: #48ed35;">GarminConnectDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminRumors-DarkMode.user.css" style="color: #58e0fd;">GarminRumors-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GreasyForkDark.user.css" style="color: #5bc089;">GreasyForkDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Gyazo-DarkMode.user.css" style="color: #5dcc34;">Gyazo-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Kiwifarms-Black.user.css" style="color: #24e932;">Kiwifarms-Black.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Kiwifarms-Halloween.user.css" style="color: #56a49a;">Kiwifarms-Halloween.user.css</a></li></ul>`;
                    break;
                case 'file-list-3':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Kiwifarms-Vaporwave.user.css" style="color: #9c79ad;">Kiwifarms-Vaporwave.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Klimat.app-DarkMode.user.css" style="color: #bf7f32;">Klimat.app-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MarkdownViewer%2B%2BTheme.user.css" style="color: #5b9b4f;">MarkdownViewer++Theme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Medicare-Gov-Dark-Mode.user.css" style="color: #a79265;">Medicare-Gov-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MyBikeTraffic-DarkMode.user.css" style="color: #ccbc5b;">MyBikeTraffic-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MyWorkoutCompanion-Dark.user.css" style="color: #54e466;">MyWorkoutCompanion-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Nascar.com-DarkMode.user.css" style="color: #43a04d;">Nascar.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/NewYorkerDarkMode.user.css" style="color: #579d9b;">NewYorkerDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/NewYorkerSimpleDarkMode.user.css" style="color: #d38e59;">NewYorkerSimpleDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRS-HiScores-BlackMode.user.css" style="color: #758cb9;">OSRS-HiScores-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWorldHeatmap-Dark.user.css" style="color: #6bc819;">OSRSWorldHeatmap-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OsrsWikiDarkMode.user.css" style="color: #29c862;">OsrsWikiDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Papertrails-DarkMode.user.css" style="color: #47a6a5;">Papertrails-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PathFinderW3School-Dark.user.css" style="color: #ce99c2;">PathFinderW3School-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PowerMeter.cc-DarkMode.user.css" style="color: #88bfdc;">PowerMeter.cc-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PromptHero-Dark.user.css" style="color: #fbc449;">PromptHero-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RedditColoredComments.user.css" style="color: #b1916c;">RedditColoredComments.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Scrap.tf-BlackTheme.user.css" style="color: #ecad32;">Scrap.tf-BlackTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Skial-CustomTheme.user.css" style="color: #ab8cda;">Skial-CustomTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SportSurge-BlackMode.user.css" style="color: #6e94bb;">SportSurge-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SquadRats-Dark.user.css" style="color: #dc7a57;">SquadRats-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Statshunters-Dark.user.css" style="color: #22cc07;">Statshunters-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamDB-Black-Mode.user.css" style="color: #3da0dd;">SteamDB-Black-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamDB-Dark-Mode.user.css" style="color: #47c0a1;">SteamDB-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Brawlhalla.user.css" style="color: #69d824;">SteamStat.us-Re-Remastered-Brawlhalla.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Christmas-Style.user.css" style="color: #e2cb1f;">SteamStat.us-Re-Remastered-Christmas-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Detroit-Lions-Style.user.css" style="color: #26c28d;">SteamStat.us-Re-Remastered-Detroit-Lions-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Detroit-Tigers.user.css" style="color: #ddc430;">SteamStat.us-Re-Remastered-Detroit-Tigers.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Easter-Style.user.css" style="color: #39a950;">SteamStat.us-Re-Remastered-Easter-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Green-BlackStyle.user.css" style="color: #f699df;">SteamStat.us-Re-Remastered-Green-BlackStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Halloween-Style.user.css" style="color: #2df71c;">SteamStat.us-Re-Remastered-Halloween-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Lime%20Green-Purple%20Style.user.css" style="color: #29b9cf;">SteamStat.us-Re-Remastered-Lime Green-Purple Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Miami-Heat.user.css" style="color: #27b362;">SteamStat.us-Re-Remastered-Miami-Heat.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-NASCAR.user.css" style="color: #fc7a31;">SteamStat.us-Re-Remastered-NASCAR.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Orange-BlackStyle.user.css" style="color: #35e613;">SteamStat.us-Re-Remastered-Orange-BlackStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-PCMasterRace.user.css" style="color: #dfb25f;">SteamStat.us-Re-Remastered-PCMasterRace.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Pink-BlackStyle.user.css" style="color: #9ae418;">SteamStat.us-Re-Remastered-Pink-BlackStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Purple.user.css" style="color: #6292d3;">SteamStat.us-Re-Remastered-Purple.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-RainbowStyle.user.css" style="color: #89a8df;">SteamStat.us-Re-Remastered-RainbowStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-SteamStyle.user.css" style="color: #b1c976;">SteamStat.us-Re-Remastered-SteamStyle.user.css</a></li></ul>`;
                    break;
                case 'file-list-4':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Sunset-Style.user.css" style="color: #dcb646;">SteamStat.us-Re-Remastered-Sunset-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-TeamFortress2.user.css" style="color: #67d88e;">SteamStat.us-Re-Remastered-TeamFortress2.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-The-Crew-Motorfest.user.css" style="color: #4e99dd;">SteamStat.us-Re-Remastered-The-Crew-Motorfest.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-TourDeFrance.user.css" style="color: #d3be71;">SteamStat.us-Re-Remastered-TourDeFrance.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-USA-Style.user.css" style="color: #f370cb;">SteamStat.us-Re-Remastered-USA-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Windows95.user.css" style="color: #bba2b1;">SteamStat.us-Re-Remastered-Windows95.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Witcher3.user.css" style="color: #6d9563;">SteamStat.us-Re-Remastered-Witcher3.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Wolverines-Style.user.css" style="color: #bc8b90;">SteamStat.us-Re-Remastered-Wolverines-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-WorldOfWarcraft.user.css" style="color: #fc6d4f;">SteamStat.us-Re-Remastered-WorldOfWarcraft.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Zwift.user.css" style="color: #6eaa8e;">SteamStat.us-Re-Remastered-Zwift.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered.user.css" style="color: #47c1b9;">SteamStat.us-Re-Remastered.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamTradeMatcher-DarkMode.user.css" style="color: #d3aaa6;">SteamTradeMatcher-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StepSecurityDarkMode.user.css" style="color: #6abc0c;">StepSecurityDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaAutoDarkTheme.user.css" style="color: #4794e0;">StravaAutoDarkTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaStratTracker-DarkMode.user.css" style="color: #d27c6b;">StravaStratTracker-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StreamingSitesStreamsBlackDarkMode.user.css" style="color: #b2a07e;">StreamingSitesStreamsBlackDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Stylus-DarkTheme-Updated.user.css" style="color: #3bf86e;">Stylus-DarkTheme-Updated.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StylusEditorChromeDark-Fixed.user.css" style="color: #c58ad9;">StylusEditorChromeDark-Fixed.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StylusFluent-Updated.user.css" style="color: #4ad067;">StylusFluent-Updated.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TamperMonkey-DarkGreen.user.css" style="color: #f1c737;">TamperMonkey-DarkGreen.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TamperMonkey-DarkMode.user.css" style="color: #b2d64a;">TamperMonkey-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TeamFortressWIki-Dark.user.css" style="color: #d5760c;">TeamFortressWIki-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TechPowerUp-DarkMode.user.css" style="color: #4ae945;">TechPowerUp-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TrainingPeaks-DarkMode.user.css" style="color: #abb695;">TrainingPeaks-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UPS.com-DarkMode.user.css" style="color: #ceb7ea;">UPS.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Unroll.me-DarkMode.user.css" style="color: #4c977c;">Unroll.me-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UptimeRobotDark.user.css" style="color: #25fd23;">UptimeRobotDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserStyle-Root-ColorTemplate.user.css" style="color: #d179d9;">UserStyle-Root-ColorTemplate.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserscriptTemplate.user.css" style="color: #30f40d;">UserscriptTemplate.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserscriptZone-Dark.user.css" style="color: #23dd64;">UserscriptZone-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserstyleWorld-DarkBamaBraves.user.css" style="color: #439ae2;">UserstyleWorld-DarkBamaBraves.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/VisualStudioCode-DarkMode.user.css" style="color: #b8838b;">VisualStudioCode-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/WahooFitnessDarkMode.user.css" style="color: #74c7d0;">WahooFitnessDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Walmart.com-DarkMode.user.css" style="color: #44c0bf;">Walmart.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wanderer-Dark.user.css" style="color: #ee752c;">Wanderer-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Weather.com-DarkMode.user.css" style="color: #42abec;">Weather.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/WebHint-Dark.user.css" style="color: #6bd630;">WebHint-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wigle-DarkMode-Beta.user.css" style="color: #c4a9f6;">Wigle-DarkMode-Beta.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wigle-DarkMode.user.css" style="color: #5eacda;">Wigle-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wikipedia-OLED-SettingsPage.user.css" style="color: #9dc8f3;">Wikipedia-OLED-SettingsPage.user.css</a></li></ul>`;
                    break;
                case 'file-list-5':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Windy-DarkMode.user.css" style="color: #6eae7f;">Windy-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YT-Vibra.user.css" style="color: #3bfc0d;">YT-Vibra.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeRainbowProgress.user.css" style="color: #3cdf44;">YoutubeRainbowProgress.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeScrubberColors.user.css" style="color: #cba258;">YoutubeScrubberColors.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeTV-BlackMode.user.css" style="color: #67c167;">YoutubeTV-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Zwift.com-Dark-Mode.user.css" style="color: #c2a928;">Zwift.com-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwiftHacks-DarkMode.user.css" style="color: #6b9d8e;">ZwiftHacks-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwiftInsiderDarkMode.user.css" style="color: #efacb0;">ZwiftInsiderDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwiftPower.comDark%20Mode.user.css" style="color: #84ae54;">ZwiftPower.comDark Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Zwiftalizer.com-Darker-Mode.user.css" style="color: #849089;">Zwiftalizer.com-Darker-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwifterBikesDarkMode.user.css" style="color: #88b408;">ZwifterBikesDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/abcnews.go.com-DarkMode.user.css" style="color: #989ff5;">abcnews.go.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/bicycling-DarkMode.user.css" style="color: #ce8c1b;">bicycling-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/detroitmi.gov-DarkMode.user.css" style="color: #7bced7;">detroitmi.gov-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ebay-Dark-Mode.user.css" style="color: #acd109;">ebay-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/findthatride-darkmode.user.css" style="color: #9cd638;">findthatride-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/fitfiletools-darkmode.user.css" style="color: #b47b41;">fitfiletools-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/fivethirtyeight.comDarkMode.user.css" style="color: #f196e4;">fivethirtyeight.comDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/jalopnik.com-DarkMode.user.css" style="color: #fe59ec;">jalopnik.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/kom.club-darkmode.user.css" style="color: #f7ba4e;">kom.club-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/makinolo.com-Dark-Mode.user.css" style="color: #56c663;">makinolo.com-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/michigan.gov-DarkMode.user.css" style="color: #da8765;">michigan.gov-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/mywindsock-darkmode.user.css" style="color: #afabb4;">mywindsock-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/nbcwashington.com-DarkMode.user.css" style="color: #b3b0d6;">nbcwashington.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/nytimes.com-DarkModeSimple.user.css" style="color: #7caee4;">nytimes.com-DarkModeSimple.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/p337info-tf2.user.css" style="color: #d99104;">p337info-tf2.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/runalyze-darkmode.user.css" style="color: #29b3ac;">runalyze-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/stravatoolbox-darkmode.user.css" style="color: #45c7b2;">stravatoolbox-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/veloviewer-darkmode.user.css" style="color: #40f144;">veloviewer-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/zwifthub.com-darkmode.user.css" style="color: #e36a76;">zwifthub.com-darkmode.user.css</a></li>
<h2 style="color: #bf9c7b;">Userscripts</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/AscentDescentMetersToFeet.user.js" style="color: #5dd767;">AscentDescentMetersToFeet.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/AutoMergeDependabotPRs.user.js" style="color: #acce7d;">AutoMergeDependabotPRs.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/DeleteYoutubePlaylists.user.js" style="color: #42d6f0;">DeleteYoutubePlaylists.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnhanceYouTubeProfilePictures.user.js" style="color: #86d2f0;">EnhanceYouTubeProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnlargeKiwifarmsProfilePictures.user.js" style="color: #67c276;">EnlargeKiwifarmsProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnlargeYouTubeChatProfilePictures.user.js" style="color: #dec308;">EnlargeYouTubeChatProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnlargeYouTubeCommentSectionProfilePictures.user.js" style="color: #3ccd08;">EnlargeYouTubeCommentSectionProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GOTOESFitFileEditor-AutoClosePopup.user.js" style="color: #57c5f6;">GOTOESFitFileEditor-AutoClosePopup.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminConnectRemoveGear.user.js" style="color: #92a8fd;">GarminConnectRemoveGear.user.js</a></li></ul>`;
                    break;
                case 'file-list-6':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GithubMarkMergedDone.user.js" style="color: #e7a7ea;">GithubMarkMergedDone.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GyazoDirectLink.user.js" style="color: #b1af9d;">GyazoDirectLink.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/HideChineseUserstyles.user.js" style="color: #e97807;">HideChineseUserstyles.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/HideNon-EnglishUserstyles.user.js" style="color: #4ad16f;">HideNon-EnglishUserstyles.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/KudoAll-Strava-Garmin.user.js" style="color: #6df00a;">KudoAll-Strava-Garmin.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MergeDependabotPRs.user.js" style="color: #8da9a7;">MergeDependabotPRs.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWikiAuto-Categorizer-SlowMode.user.js" style="color: #dd8fcf;">OSRSWikiAuto-Categorizer-SlowMode.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWikiAuto-Categorizer.user.js" style="color: #7ba64a;">OSRSWikiAuto-Categorizer.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWikiAuto-Navbox-SlowMode.user.js" style="color: #44c185;">OSRSWikiAuto-Navbox-SlowMode.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-API-Key-Version-Reddit-Only-Version.user.js" style="color: #30b101;">OldRedditNewProfilePictures-API-Key-Version-Reddit-Only-Version.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-API-Key-Version-Reddit-Stream-Version.user.js" style="color: #bac46b;">OldRedditNewProfilePictures-API-Key-Version-Reddit-Stream-Version.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-API-Key-Version.user.js" style="color: #47ac7f;">OldRedditNewProfilePictures-API-Key-Version.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-UniversalVersion.user.js" style="color: #b0be21;">OldRedditNewProfilePictures-UniversalVersion.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures.user.js" style="color: #aca069;">OldRedditNewProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures/Old%20Reddit%20with%20New%20Profile%20Pictures.user.js" style="color: #b59cf2;">OldRedditNewProfilePictures/Old Reddit with New Profile Pictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RedditStreamAutoRefresher.user.js" style="color: #949cfe;">RedditStreamAutoRefresher.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RedditStreamAutoRefresherFaster.user.js" style="color: #3ee6ae;">RedditStreamAutoRefresherFaster.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RightClickEnable.user.js" style="color: #3ac206;">RightClickEnable.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaAutoAuthorize.user.js" style="color: #3af414;">StravaAutoAuthorize.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaTextAuto-Selector.user.js" style="color: #6b9fde;">StravaTextAuto-Selector.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SuperchargedLocalDirectoryWebUI.user.js" style="color: #94bec7;">SuperchargedLocalDirectoryWebUI.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserstyleWorld-SyncStyles.user.js" style="color: #7f8193;">UserstyleWorld-SyncStyles.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTV-Volume-Rememberer.user.js" style="color: #dd7714;">YouTubeTV-Volume-Rememberer.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl.user.js" style="color: #90d1a0;">YouTubeTVVolumeControl.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl.user.js" style="color: #81a5b6;">YouTubeVolumeControl.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeVolumeDisplay.user.js" style="color: #c4d51e;">YoutubeVolumeDisplay.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Zwift-Give-RideOns-to-Everyone.user.js" style="color: #a5879e;">Zwift-Give-RideOns-to-Everyone.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/reddit-stream-Enhancements.user.js" style="color: #a3758d;">reddit-stream-Enhancements.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-Add-Balance-Original.user.js" style="color: #a89056;">strava-balance/Strava-Add-Balance-Original.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-Add-Balance-Updated.user.js" style="color: #a7d495;">strava-balance/Strava-Add-Balance-Updated.user.js</a></li>
<h2 style="color: #448df8;">CSS</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Discord-Dark%2B-Default-Member-List.css" style="color: #899875;">Discord-Dark+-Default-Member-List.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/styles.css" style="color: #79b0c4;">YouTubeVolumeControl/styles.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.css" style="color: #77dfbb;">codemirror.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.min.css" style="color: #ca8ab1;">codemirror.min.css</a></li>
<h2 style="color: #69ba3d;">JavaScript</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.eslintrc.js" style="color: #c7b0ed;">.eslintrc.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/background.js" style="color: #5cb8ca;">SteamCookieExtractor2/background.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/content.js" style="color: #51e35f;">SteamCookieExtractor2/content.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/options.js" style="color: #6ada84;">SteamCookieExtractor2/options.js</a></li></ul>`;
                    break;
                case 'file-list-7':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/popup.js" style="color: #efbaaf;">SteamCookieExtractor2/popup.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/WIndyPlugin.min.js" style="color: #26f0b7;">WIndyPlugin.min.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/background.js" style="color: #b1d854;">YouTubeTVVolumeControl/background.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/content.js" style="color: #54f05a;">YouTubeTVVolumeControl/content.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/background.js" style="color: #c7705c;">YouTubeVolumeControl/background.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/content.js" style="color: #faaa76;">YouTubeVolumeControl/content.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify-css-mod.js" style="color: #39bd2f;">beautify-css-mod.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify.js" style="color: #d0bf3f;">beautify.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.js" style="color: #f36c7a;">codemirror.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.min.js" style="color: #f1c02b;">codemirror.min.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/convertHexToRgba.js" style="color: #5ddb54;">convertHexToRgba.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/css.js" style="color: #32a5b9;">css.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/css.min.js" style="color: #2ff354;">css.min.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/cyclingCalculators.js" style="color: #a9a5d6;">cyclingCalculators.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-AddBalance-Updated.js" style="color: #40fa4b;">strava-balance/Strava-AddBalance-Updated.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-AddBalance.js" style="color: #8edc7a;">strava-balance/Strava-AddBalance.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/binary-Updated.js" style="color: #c383f6;">strava-balance/binary-Updated.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/binary.js" style="color: #d27ed6;">strava-balance/binary.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/buffer-5.6.1/base64-js-1.3.1/index.js" style="color: #95a57a;">strava-balance/buffer-5.6.1/base64-js-1.3.1/index.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/buffer-5.6.1/ieee754-1.1.13/index.js" style="color: #74cb7e;">strava-balance/buffer-5.6.1/ieee754-1.1.13/index.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/buffer-5.6.1/index.js" style="color: #af74ed;">strava-balance/buffer-5.6.1/index.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/fit-parser-Updated.js" style="color: #43ef5d;">strava-balance/fit-parser-Updated.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/fit-parser.js" style="color: #e48ccd;">strava-balance/fit-parser.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/fit.js" style="color: #62ab29;">strava-balance/fit.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/messages.js" style="color: #80dca6;">strava-balance/messages.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/strava-fit-parser.js" style="color: #8c903d;">strava-balance/strava-fit-parser.js</a></li>
<h2 style="color: #56b5b3;">YAML</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/dependabot.yml" style="color: #6fa9ca;">.github/dependabot.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/labeler.yml" style="color: #f38790;">.github/labeler.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/ActionLint.yml" style="color: #e49de3;">.github/workflows/ActionLint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/Bandit.yml" style="color: #e476c1;">.github/workflows/Bandit.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/Snake.yml" style="color: #a49294;">.github/workflows/Snake.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/black-formatter.yml" style="color: #eca7c0;">.github/workflows/black-formatter.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/codeql.yml" style="color: #b277d5;">.github/workflows/codeql.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/defender.yml" style="color: #adb65d;">.github/workflows/defender.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/deno.yml" style="color: #6bd44b;">.github/workflows/deno.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/dependency-review.yml" style="color: #ae874b;">.github/workflows/dependency-review.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/devskim.yml" style="color: #89cc3b;">.github/workflows/devskim.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/eslint.yml" style="color: #a7c376;">.github/workflows/eslint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/generate-file-list.yml" style="color: #82ac0d;">.github/workflows/generate-file-list.yml</a></li></ul>`;
                    break;
                case 'file-list-8':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/greetings.yml" style="color: #e17309;">.github/workflows/greetings.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/label.yml" style="color: #38da70;">.github/workflows/label.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/ossar.yml" style="color: #d59b77;">.github/workflows/ossar.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/osv-scanner.yml" style="color: #a1ae3d;">.github/workflows/osv-scanner.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/scorecards.yml" style="color: #cc7136;">.github/workflows/scorecards.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/semgrep.yml" style="color: #22a93f;">.github/workflows/semgrep.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/sitemap.yml" style="color: #7ccf45;">.github/workflows/sitemap.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/sobelow.yml" style="color: #b2b248;">.github/workflows/sobelow.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/stale.yml" style="color: #39a327;">.github/workflows/stale.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/static.yml" style="color: #7a847e;">.github/workflows/static.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/stylelint.yml" style="color: #ccc489;">.github/workflows/stylelint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/super-linter.yml" style="color: #78f10a;">.github/workflows/super-linter.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.markdownlint.yml" style="color: #7ce00f;">.markdownlint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.scss-lint.yml" style="color: #6f8ecb;">.scss-lint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/_config.yml" style="color: #e1c94f;">_config.yml</a></li>
<h2 style="color: #67c7c4;">.github/ISSUE_TEMPLATE</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/ISSUE_TEMPLATE/bug_report.md" style="color: #26b78f;">.github/ISSUE_TEMPLATE/bug_report.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/ISSUE_TEMPLATE/feature_request.md" style="color: #46ec5f;">.github/ISSUE_TEMPLATE/feature_request.md</a></li>
<h2 style="color: #c6bd69;">.github/PULL_REQUEST_TEMPLATE</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/PULL_REQUEST_TEMPLATE/pull_request_template.md" style="color: #78ee13;">.github/PULL_REQUEST_TEMPLATE/pull_request_template.md</a></li>
<h2 style="color: #c8bc95;">.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/bug_report.md" style="color: #43eda5;">.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/bug_report.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/feature_request.md" style="color: #8eb489;">.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/feature_request.md</a></li>
<h2 style="color: #e8bf6d;">.vscode</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/generate_file_list.py" style="color: #f2b064;">.vscode/generate_file_list.py</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/launch.json" style="color: #938837;">.vscode/launch.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/settings.json" style="color: #e6ab65;">.vscode/settings.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/tasks.json" style="color: #81cc93;">.vscode/tasks.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/test_generate_file_list.py" style="color: #79a78a;">.vscode/test_generate_file_list.py</a></li>
<h2 style="color: #c2b5d4;">OldRedditNewProfilePictures</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures/Old%20Reddit%20with%20New%20Profile%20Pictures.options.json" style="color: #a7cc8a;">OldRedditNewProfilePictures/Old Reddit with New Profile Pictures.options.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures/Old%20Reddit%20with%20New%20Profile%20Pictures.storage.json" style="color: #de8b06;">OldRedditNewProfilePictures/Old Reddit with New Profile Pictures.storage.json</a></li>
<h2 style="color: #bb82fc;">SteamCookieExtractor2</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/manifest.json" style="color: #a7bce6;">SteamCookieExtractor2/manifest.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/options.html" style="color: #6bc974;">SteamCookieExtractor2/options.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/popup.html" style="color: #81ae34;">SteamCookieExtractor2/popup.html</a></li>
<h2 style="color: #3eeac9;">SteamCookieExtractor2/icons</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/icon128.png" style="color: #9aa2dc;">SteamCookieExtractor2/icons/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/icon16.png" style="color: #b2b057;">SteamCookieExtractor2/icons/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/icon48.png" style="color: #e8818f;">SteamCookieExtractor2/icons/icon48.png</a></li></ul>`;
                    break;
                case 'file-list-9':
                    file_list_html = `<ul><h2 style="color: #fdb8a0;">SteamCookieExtractor2/icons/images</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/images/icon128.png" style="color: #a56aed;">SteamCookieExtractor2/icons/images/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/images/icon16.png" style="color: #848865;">SteamCookieExtractor2/icons/images/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/images/icon48.png" style="color: #64db31;">SteamCookieExtractor2/icons/images/icon48.png</a></li>
<h2 style="color: #c5d023;">YouTubeTVVolumeControl</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/icon128.png" style="color: #55bbfe;">YouTubeTVVolumeControl/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/icon16.png" style="color: #ba93b4;">YouTubeTVVolumeControl/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/icon48.png" style="color: #55a67a;">YouTubeTVVolumeControl/icon48.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/manifest.json" style="color: #abbe22;">YouTubeTVVolumeControl/manifest.json</a></li>
<h2 style="color: #7890a7;">YouTubeVolumeControl</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icon128.png" style="color: #93bf65;">YouTubeVolumeControl/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icon16.png" style="color: #37b96c;">YouTubeVolumeControl/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icon48.png" style="color: #f0aa5d;">YouTubeVolumeControl/icon48.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/manifest.json" style="color: #5c9a3e;">YouTubeVolumeControl/manifest.json</a></li>
<h2 style="color: #5da7b4;">YouTubeVolumeControl/icons</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/icon128.png" style="color: #e29af4;">YouTubeVolumeControl/icons/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/icon16.png" style="color: #e6b416;">YouTubeVolumeControl/icons/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/icon48.png" style="color: #26cf95;">YouTubeVolumeControl/icons/icon48.png</a></li>
<h2 style="color: #3ab157;">YouTubeVolumeControl/icons/images</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/images/icon128.png" style="color: #8a90c1;">YouTubeVolumeControl/icons/images/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/images/icon16.png" style="color: #89dc54;">YouTubeVolumeControl/icons/images/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/images/icon48.png" style="color: #ab93dd;">YouTubeVolumeControl/icons/images/icon48.png</a></li>
<h2 style="color: #39eb78;">assets</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-city-background.png" style="color: #b8a193;">assets/kiwi-city-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-default-background.png" style="color: #6ca198;">assets/kiwi-default-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-flower-background.png" style="color: #ffa81c;">assets/kiwi-flower-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-green-background.png" style="color: #d9a708;">assets/kiwi-green-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-purple-background.png" style="color: #f79810;">assets/kiwi-purple-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-space-apple-background.png" style="color: #b2b818;">assets/kiwi-space-apple-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-swirls-background.png" style="color: #df916c;">assets/kiwi-swirls-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-trees-background.png" style="color: #45f120;">assets/kiwi-trees-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-vaporwave-logo.png" style="color: #93d01f;">assets/kiwi-vaporwave-logo.png</a></li>
<h2 style="color: #79bc71;">src</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/src/generate_file_list.py" style="color: #3bbd4c;">src/generate_file_list.py</a></li></ul>`;
                    break;
            }
            placeholder.innerHTML = file_list_html;
        });
    }
});
</script>
