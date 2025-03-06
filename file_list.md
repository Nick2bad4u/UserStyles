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
                            file_list_html = `<ul><h2 style="color: #29f04e;">Repo Root</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.black" style="color: #a69d33;">.black</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.copilot-instructions.md" style="color: #8be72c;">.copilot-instructions.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.editorconfig" style="color: #b88a45;">.editorconfig</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.gitignore" style="color: #e469dd;">.gitignore</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.gitleaksignore" style="color: #a883b6;">.gitleaksignore</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.hintrc" style="color: #daca76;">.hintrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.jsbeautifyrc" style="color: #34f41c;">.jsbeautifyrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.jscsrc" style="color: #5d9a61;">.jscsrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.npmrc" style="color: #2cf0d8;">.npmrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.pre-commit-config.yaml" style="color: #34b8b3;">.pre-commit-config.yaml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.pre-commit-hooks.yaml" style="color: #cebd86;">.pre-commit-hooks.yaml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierignore" style="color: #519e81;">.prettierignore</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierrc" style="color: #37ec9f;">.prettierrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierrc.noplugins" style="color: #2cc6f4;">.prettierrc.noplugins</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierrc.temp" style="color: #2cab42;">.prettierrc.temp</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.stylelintrc.json" style="color: #60dbfa;">.stylelintrc.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vale.ini" style="color: #8fb058;">.vale.ini</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CNAME" style="color: #e48e60;">CNAME</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CODE_OF_CONDUCT.md" style="color: #95c782;">CODE_OF_CONDUCT.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CONTRIBUTING.md" style="color: #8b9baf;">CONTRIBUTING.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Gemfile" style="color: #b7c4ad;">Gemfile</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Gemfile.lock" style="color: #9b8abf;">Gemfile.lock</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/KudoAll-Strava-Garmin.user.test.cjs" style="color: #61d44d;">KudoAll-Strava-Garmin.user.test.cjs</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/LICENSE" style="color: #51e11a;">LICENSE</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Microsoft.PowerShell_profile.Tests.ps1" style="color: #42c4b8;">Microsoft.PowerShell_profile.Tests.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Microsoft.PowerShell_profile.ps1" style="color: #3ee83f;">Microsoft.PowerShell_profile.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Microsoft.VSCode_profile.ps1" style="color: #f3ad4e;">Microsoft.VSCode_profile.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures.html" style="color: #9a9c7a;">OldRedditNewProfilePictures.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PrettierFormatExcludePreprocessor.ps1" style="color: #b877f6;">PrettierFormatExcludePreprocessor.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Profile.ps1" style="color: #bfd54d;">Profile.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/README.md" style="color: #3ebf3f;">README.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SECURITY.md" style="color: #7ed6eb;">SECURITY.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify-local.html" style="color: #41d6ad;">beautify-local.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify.html" style="color: #e4b876;">beautify.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/convertHexToRgba.html" style="color: #c58ed0;">convertHexToRgba.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/cyclingCalculators.html" style="color: #40a3d6;">cyclingCalculators.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/deno.json" style="color: #27ec88;">deno.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/deno.lock" style="color: #c77f0b;">deno.lock</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/eslint.config.mjs" style="color: #3ce001;">eslint.config.mjs</a></li></ul>`;
                            break;
                        case 'file-list-2':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/favicon.ico" style="color: #cb8bd1;">favicon.ico</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/favicon.png" style="color: #8c928d;">favicon.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/file_list.html" style="color: #98d079;">file_list.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/file_list.md" style="color: #9aa0d0;">file_list.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/generate_gemfile.rb" style="color: #5e84f6;">generate_gemfile.rb</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/jsconfig.json" style="color: #a7c3cb;">jsconfig.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/package-lock.json" style="color: #87d399;">package-lock.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/package.json" style="color: #b7c2f0;">package.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/requirements.txt" style="color: #60a572;">requirements.txt</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/robots.txt" style="color: #f757d6;">robots.txt</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/sitemap.xml" style="color: #cb7661;">sitemap.xml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/useragent-switcher-preferences.json" style="color: #53fa1d;">useragent-switcher-preferences.json</a></li>
<h2 style="color: #438ed6;">Userstyles</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/17track.net-DarkMode.user.css" style="color: #fd66c3;">17track.net-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ActivityFixDarkMode.user.css" style="color: #42bc59;">ActivityFixDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Archive.orgNightTheme%28Updated%29.user.css" style="color: #23bd57;">Archive.orgNightTheme(Updated).user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Benjdd-dark.user.css" style="color: #4cb017;">Benjdd-dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CFG.tf-DarkMode.user.css" style="color: #35e43c;">CFG.tf-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CSSGradient-DarkMode.user.css" style="color: #ada904;">CSSGradient-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CSSPortal-Dark.user.css" style="color: #81818f;">CSSPortal-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Copilot-Microsoft-Blackmode.user.css" style="color: #58a556;">Copilot-Microsoft-Blackmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CrystalMathLabs-BlackMode.user.css" style="color: #bea503;">CrystalMathLabs-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/DCRainMaker-DarkMode.user.css" style="color: #c29771;">DCRainMaker-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Dearrow-RemoveDearrowButton.user.css" style="color: #62c78e;">Dearrow-RemoveDearrowButton.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/DeepSeek-DarkMode.user.css" style="color: #8b88c9;">DeepSeek-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ESPN-DarkMode.user.css" style="color: #76e498;">ESPN-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/FandomDark.user.css" style="color: #cdad8a;">FandomDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Favero-DarkMode.user.css" style="color: #d79b18;">Favero-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Fedex.com-DarkMode.user.css" style="color: #31eb6f;">Fedex.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/FitFileViewer-DarkTheme.user.css" style="color: #2fcba3;">FitFileViewer-DarkTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/FiveServer-DarkMode.user.css" style="color: #519d1b;">FiveServer-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GOTOES.org-DarkMode.user.css" style="color: #2ae704;">GOTOES.org-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GTBikeV-DarkMode.user.css" style="color: #369dd9;">GTBikeV-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminBadges-DarkMode.user.css" style="color: #2fe109;">GarminBadges-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminConnectDark.user.css" style="color: #a89c71;">GarminConnectDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminRumors-DarkMode.user.css" style="color: #5984d5;">GarminRumors-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GreasyForkDark.user.css" style="color: #f06b2b;">GreasyForkDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Gyazo-DarkMode.user.css" style="color: #f85b90;">Gyazo-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Kiwifarms-Black.user.css" style="color: #e56791;">Kiwifarms-Black.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Kiwifarms-Halloween.user.css" style="color: #e290c3;">Kiwifarms-Halloween.user.css</a></li></ul>`;
                            break;
                        case 'file-list-3':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Kiwifarms-Vaporwave.user.css" style="color: #809543;">Kiwifarms-Vaporwave.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Klimat.app-DarkMode.user.css" style="color: #c19ec1;">Klimat.app-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MarkdownViewer%2B%2BTheme.user.css" style="color: #5cbf9e;">MarkdownViewer++Theme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Medicare-Gov-Dark-Mode.user.css" style="color: #bfaec0;">Medicare-Gov-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MyBikeTraffic-DarkMode.user.css" style="color: #6180dc;">MyBikeTraffic-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MyWorkoutCompanion-Dark.user.css" style="color: #79a0fe;">MyWorkoutCompanion-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Nascar.com-DarkMode.user.css" style="color: #a6888e;">Nascar.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/NewYorkerDarkMode.user.css" style="color: #39fa58;">NewYorkerDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/NewYorkerSimpleDarkMode.user.css" style="color: #a7c968;">NewYorkerSimpleDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRS-HiScores-BlackMode.user.css" style="color: #e56f46;">OSRS-HiScores-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWorldHeatmap-Dark.user.css" style="color: #767ce0;">OSRSWorldHeatmap-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OsrsWikiDarkMode.user.css" style="color: #f5b653;">OsrsWikiDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Papertrails-DarkMode.user.css" style="color: #d5a188;">Papertrails-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PathFinderW3School-Dark.user.css" style="color: #81a9bd;">PathFinderW3School-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PowerMeter.cc-DarkMode.user.css" style="color: #999a40;">PowerMeter.cc-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PromptHero-Dark.user.css" style="color: #27c159;">PromptHero-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RedditColoredComments.user.css" style="color: #b17570;">RedditColoredComments.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Scrap.tf-BlackTheme.user.css" style="color: #bf9b24;">Scrap.tf-BlackTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Skial-CustomTheme.user.css" style="color: #eea450;">Skial-CustomTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SportSurge-BlackMode.user.css" style="color: #d595b1;">SportSurge-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SquadRats-Dark.user.css" style="color: #ccb512;">SquadRats-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Statshunters-Dark.user.css" style="color: #44c5d4;">Statshunters-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamDB-Black-Mode.user.css" style="color: #25e08e;">SteamDB-Black-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamDB-Dark-Mode.user.css" style="color: #869951;">SteamDB-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Brawlhalla.user.css" style="color: #9ab70e;">SteamStat.us-Re-Remastered-Brawlhalla.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Christmas-Style.user.css" style="color: #afcf02;">SteamStat.us-Re-Remastered-Christmas-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Detroit-Lions-Style.user.css" style="color: #87ed07;">SteamStat.us-Re-Remastered-Detroit-Lions-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Detroit-Tigers.user.css" style="color: #f38476;">SteamStat.us-Re-Remastered-Detroit-Tigers.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Easter-Style.user.css" style="color: #faafba;">SteamStat.us-Re-Remastered-Easter-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Green-BlackStyle.user.css" style="color: #d161cb;">SteamStat.us-Re-Remastered-Green-BlackStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Halloween-Style.user.css" style="color: #5daeb2;">SteamStat.us-Re-Remastered-Halloween-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Lime%20Green-Purple%20Style.user.css" style="color: #2dfc17;">SteamStat.us-Re-Remastered-Lime Green-Purple Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Miami-Heat.user.css" style="color: #86d22c;">SteamStat.us-Re-Remastered-Miami-Heat.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-NASCAR.user.css" style="color: #e0b3c0;">SteamStat.us-Re-Remastered-NASCAR.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Orange-BlackStyle.user.css" style="color: #a2d617;">SteamStat.us-Re-Remastered-Orange-BlackStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-PCMasterRace.user.css" style="color: #46de79;">SteamStat.us-Re-Remastered-PCMasterRace.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Pink-BlackStyle.user.css" style="color: #8c8fb1;">SteamStat.us-Re-Remastered-Pink-BlackStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Purple.user.css" style="color: #908196;">SteamStat.us-Re-Remastered-Purple.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-RainbowStyle.user.css" style="color: #b2d561;">SteamStat.us-Re-Remastered-RainbowStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-SteamStyle.user.css" style="color: #c1b99e;">SteamStat.us-Re-Remastered-SteamStyle.user.css</a></li></ul>`;
                            break;
                        case 'file-list-4':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Sunset-Style.user.css" style="color: #8e95b9;">SteamStat.us-Re-Remastered-Sunset-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-TeamFortress2.user.css" style="color: #d3a6e6;">SteamStat.us-Re-Remastered-TeamFortress2.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-The-Crew-Motorfest.user.css" style="color: #56f303;">SteamStat.us-Re-Remastered-The-Crew-Motorfest.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-TourDeFrance.user.css" style="color: #6fbe3f;">SteamStat.us-Re-Remastered-TourDeFrance.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-USA-Style.user.css" style="color: #ba90b7;">SteamStat.us-Re-Remastered-USA-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Windows95.user.css" style="color: #e28e65;">SteamStat.us-Re-Remastered-Windows95.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Witcher3.user.css" style="color: #dcb0fa;">SteamStat.us-Re-Remastered-Witcher3.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Wolverines-Style.user.css" style="color: #b86dee;">SteamStat.us-Re-Remastered-Wolverines-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-WorldOfWarcraft.user.css" style="color: #53c9a5;">SteamStat.us-Re-Remastered-WorldOfWarcraft.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Zwift.user.css" style="color: #d9c3a6;">SteamStat.us-Re-Remastered-Zwift.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered.user.css" style="color: #b69a3c;">SteamStat.us-Re-Remastered.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamTradeMatcher-DarkMode.user.css" style="color: #bad918;">SteamTradeMatcher-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StepSecurityDarkMode.user.css" style="color: #41c03b;">StepSecurityDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaAutoDarkTheme.user.css" style="color: #9da5b4;">StravaAutoDarkTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaStratTracker-DarkMode.user.css" style="color: #76d0c0;">StravaStratTracker-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StreamingSitesStreamsBlackDarkMode.user.css" style="color: #45a05d;">StreamingSitesStreamsBlackDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Stylus-DarkTheme-Updated.user.css" style="color: #d89deb;">Stylus-DarkTheme-Updated.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StylusEditorChromeDark-Fixed.user.css" style="color: #78b7b6;">StylusEditorChromeDark-Fixed.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StylusFluent-Updated.user.css" style="color: #34ac79;">StylusFluent-Updated.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TamperMonkey-DarkGreen.user.css" style="color: #95a689;">TamperMonkey-DarkGreen.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TamperMonkey-DarkMode.user.css" style="color: #2db164;">TamperMonkey-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TeamFortressWIki-Dark.user.css" style="color: #a38fdf;">TeamFortressWIki-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TechPowerUp-DarkMode.user.css" style="color: #73c2e1;">TechPowerUp-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TrainingPeaks-DarkMode.user.css" style="color: #ec98a9;">TrainingPeaks-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UPS.com-DarkMode.user.css" style="color: #b6bc6c;">UPS.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Unroll.me-DarkMode.user.css" style="color: #729695;">Unroll.me-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UptimeRobotDark.user.css" style="color: #f2a6de;">UptimeRobotDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserStyle-Root-ColorTemplate.user.css" style="color: #d894bc;">UserStyle-Root-ColorTemplate.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserscriptTemplate.user.css" style="color: #d1b5ef;">UserscriptTemplate.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserscriptZone-Dark.user.css" style="color: #e774fc;">UserscriptZone-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserstyleWorld-DarkBamaBraves.user.css" style="color: #fd65fd;">UserstyleWorld-DarkBamaBraves.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/VisualStudioCode-DarkMode.user.css" style="color: #f8a5b6;">VisualStudioCode-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/WahooFitnessDarkMode.user.css" style="color: #5fcaf2;">WahooFitnessDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Walmart.com-DarkMode.user.css" style="color: #cfbd14;">Walmart.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wanderer-Dark.user.css" style="color: #c29a6d;">Wanderer-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Weather.com-DarkMode.user.css" style="color: #3da8bb;">Weather.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/WebHint-Dark.user.css" style="color: #53a5df;">WebHint-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wigle-DarkMode-Beta.user.css" style="color: #559b4a;">Wigle-DarkMode-Beta.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wigle-DarkMode.user.css" style="color: #bb9c99;">Wigle-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wikipedia-OLED-SettingsPage.user.css" style="color: #d3cd0f;">Wikipedia-OLED-SettingsPage.user.css</a></li></ul>`;
                            break;
                        case 'file-list-5':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Windy-DarkMode.user.css" style="color: #7ebec5;">Windy-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YT-Vibra.user.css" style="color: #b0a1f5;">YT-Vibra.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeRainbowProgress.user.css" style="color: #a9955f;">YoutubeRainbowProgress.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeScrubberColors.user.css" style="color: #f89d7a;">YoutubeScrubberColors.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeTV-BlackMode.user.css" style="color: #957e86;">YoutubeTV-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Zwift.com-Dark-Mode.user.css" style="color: #24c489;">Zwift.com-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwiftHacks-DarkMode.user.css" style="color: #bd6bfc;">ZwiftHacks-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwiftInsiderDarkMode.user.css" style="color: #96bc7a;">ZwiftInsiderDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwiftPower.comDark%20Mode.user.css" style="color: #fda122;">ZwiftPower.comDark Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Zwiftalizer.com-Darker-Mode.user.css" style="color: #27de59;">Zwiftalizer.com-Darker-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwifterBikesDarkMode.user.css" style="color: #90c88c;">ZwifterBikesDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/abcnews.go.com-DarkMode.user.css" style="color: #26e42a;">abcnews.go.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/bicycling-DarkMode.user.css" style="color: #65a238;">bicycling-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/detroitmi.gov-DarkMode.user.css" style="color: #9ea28d;">detroitmi.gov-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ebay-Dark-Mode.user.css" style="color: #9cbb18;">ebay-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/findthatride-darkmode.user.css" style="color: #3dc955;">findthatride-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/fitfiletools-darkmode.user.css" style="color: #e8a6e1;">fitfiletools-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/fivethirtyeight.comDarkMode.user.css" style="color: #cdbc4b;">fivethirtyeight.comDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/jalopnik.com-DarkMode.user.css" style="color: #5fb9f2;">jalopnik.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/kom.club-darkmode.user.css" style="color: #ffc228;">kom.club-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/makinolo.com-Dark-Mode.user.css" style="color: #cec078;">makinolo.com-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/michigan.gov-DarkMode.user.css" style="color: #988cf0;">michigan.gov-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/mywindsock-darkmode.user.css" style="color: #cf64bb;">mywindsock-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/nbcwashington.com-DarkMode.user.css" style="color: #cbb054;">nbcwashington.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/nytimes.com-DarkModeSimple.user.css" style="color: #3cef7a;">nytimes.com-DarkModeSimple.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/p337info-tf2.user.css" style="color: #3cf905;">p337info-tf2.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/runalyze-darkmode.user.css" style="color: #9494cd;">runalyze-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/stravatoolbox-darkmode.user.css" style="color: #29a974;">stravatoolbox-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/veloviewer-darkmode.user.css" style="color: #c4ce3c;">veloviewer-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/zwifthub.com-darkmode.user.css" style="color: #9abf04;">zwifthub.com-darkmode.user.css</a></li>
<h2 style="color: #5b9e93;">Userscripts</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/AscentDescentMetersToFeet.user.js" style="color: #5ce058;">AscentDescentMetersToFeet.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/AutoMergeDependabotPRs.user.js" style="color: #7a8a4e;">AutoMergeDependabotPRs.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/DeleteYoutubePlaylists.user.js" style="color: #3ccf96;">DeleteYoutubePlaylists.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnhanceYouTubeProfilePictures.user.js" style="color: #2fb858;">EnhanceYouTubeProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnlargeKiwifarmsProfilePictures.user.js" style="color: #8edf4d;">EnlargeKiwifarmsProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnlargeYouTubeChatProfilePictures.user.js" style="color: #5aec24;">EnlargeYouTubeChatProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnlargeYouTubeCommentSectionProfilePictures.user.js" style="color: #3bd340;">EnlargeYouTubeCommentSectionProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GOTOESFitFileEditor-AutoClosePopup.user.js" style="color: #6697f8;">GOTOESFitFileEditor-AutoClosePopup.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminConnectRemoveGear.user.js" style="color: #229bbe;">GarminConnectRemoveGear.user.js</a></li></ul>`;
                            break;
                        case 'file-list-6':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GithubMarkMergedDone.user.js" style="color: #79d277;">GithubMarkMergedDone.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GyazoDirectLink.user.js" style="color: #d961b8;">GyazoDirectLink.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/HideChineseUserstyles.user.js" style="color: #877edc;">HideChineseUserstyles.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/HideNon-EnglishUserstyles.user.js" style="color: #eb76c8;">HideNon-EnglishUserstyles.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/KudoAll-Strava-Garmin.user.js" style="color: #72c715;">KudoAll-Strava-Garmin.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MergeDependabotPRs.user.js" style="color: #c7938a;">MergeDependabotPRs.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWikiAuto-Categorizer-SlowMode.user.js" style="color: #c5beec;">OSRSWikiAuto-Categorizer-SlowMode.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWikiAuto-Categorizer.user.js" style="color: #2ccee4;">OSRSWikiAuto-Categorizer.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWikiAuto-Navbox-SlowMode.user.js" style="color: #e95db8;">OSRSWikiAuto-Navbox-SlowMode.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-API-Key-Version-Reddit-Only-Version.user.js" style="color: #64c76d;">OldRedditNewProfilePictures-API-Key-Version-Reddit-Only-Version.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-API-Key-Version-Reddit-Stream-Version.user.js" style="color: #d88541;">OldRedditNewProfilePictures-API-Key-Version-Reddit-Stream-Version.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-API-Key-Version.user.js" style="color: #9a72dd;">OldRedditNewProfilePictures-API-Key-Version.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-UniversalVersion.user.js" style="color: #54f36d;">OldRedditNewProfilePictures-UniversalVersion.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures.user.js" style="color: #ca883c;">OldRedditNewProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures/Old%20Reddit%20with%20New%20Profile%20Pictures.user.js" style="color: #81a791;">OldRedditNewProfilePictures/Old Reddit with New Profile Pictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RedditStreamAutoRefresher.user.js" style="color: #ab7389;">RedditStreamAutoRefresher.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RedditStreamAutoRefresherFaster.user.js" style="color: #5ca353;">RedditStreamAutoRefresherFaster.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RightClickEnable.user.js" style="color: #f16e94;">RightClickEnable.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaAutoAuthorize.user.js" style="color: #3ea145;">StravaAutoAuthorize.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaTextAuto-Selector.user.js" style="color: #bd9d77;">StravaTextAuto-Selector.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SuperchargedLocalDirectoryWebUI.user.js" style="color: #80b6de;">SuperchargedLocalDirectoryWebUI.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserstyleWorld-SyncStyles.user.js" style="color: #d46986;">UserstyleWorld-SyncStyles.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTV-Volume-Rememberer.user.js" style="color: #57d165;">YouTubeTV-Volume-Rememberer.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl.user.js" style="color: #66a128;">YouTubeTVVolumeControl.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl.user.js" style="color: #65d61a;">YouTubeVolumeControl.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeVolumeDisplay.user.js" style="color: #6896dd;">YoutubeVolumeDisplay.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Zwift-Give-RideOns-to-Everyone.user.js" style="color: #a395dc;">Zwift-Give-RideOns-to-Everyone.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/reddit-stream-Enhancements.user.js" style="color: #68acc9;">reddit-stream-Enhancements.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-Add-Balance-Original.user.js" style="color: #83854a;">strava-balance/Strava-Add-Balance-Original.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-Add-Balance-Updated.user.js" style="color: #81e047;">strava-balance/Strava-Add-Balance-Updated.user.js</a></li>
<h2 style="color: #f177bb;">CSS</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Discord-Dark%2B-Default-Member-List.css" style="color: #6cb2a0;">Discord-Dark+-Default-Member-List.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/styles.css" style="color: #c28107;">YouTubeVolumeControl/styles.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.css" style="color: #b3c7d9;">codemirror.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.min.css" style="color: #3aecf8;">codemirror.min.css</a></li>
<h2 style="color: #81c46c;">JavaScript</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.eslintrc.js" style="color: #2793dc;">.eslintrc.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/background.js" style="color: #70a209;">SteamCookieExtractor2/background.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/content.js" style="color: #7eadb8;">SteamCookieExtractor2/content.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/options.js" style="color: #6b8871;">SteamCookieExtractor2/options.js</a></li></ul>`;
                            break;
                        case 'file-list-7':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/popup.js" style="color: #66a6fe;">SteamCookieExtractor2/popup.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/WIndyPlugin.min.js" style="color: #a8da29;">WIndyPlugin.min.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/background.js" style="color: #ca8095;">YouTubeTVVolumeControl/background.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/content.js" style="color: #8490dc;">YouTubeTVVolumeControl/content.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/background.js" style="color: #928bf7;">YouTubeVolumeControl/background.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/content.js" style="color: #95bdf7;">YouTubeVolumeControl/content.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify-css-mod.js" style="color: #f176f5;">beautify-css-mod.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify.js" style="color: #84b302;">beautify.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.js" style="color: #3ddc07;">codemirror.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.min.js" style="color: #ec70fe;">codemirror.min.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/convertHexToRgba.js" style="color: #4ac784;">convertHexToRgba.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/css.js" style="color: #a0e12a;">css.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/css.min.js" style="color: #59ae1b;">css.min.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/cyclingCalculators.js" style="color: #36b18a;">cyclingCalculators.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-AddBalance-Updated.js" style="color: #a3a4a3;">strava-balance/Strava-AddBalance-Updated.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-AddBalance.js" style="color: #dba6d6;">strava-balance/Strava-AddBalance.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/binary-Updated.js" style="color: #e49576;">strava-balance/binary-Updated.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/binary.js" style="color: #8d7a9a;">strava-balance/binary.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/buffer-5.6.1/base64-js-1.3.1/index.js" style="color: #9ea7ce;">strava-balance/buffer-5.6.1/base64-js-1.3.1/index.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/buffer-5.6.1/ieee754-1.1.13/index.js" style="color: #bfc25a;">strava-balance/buffer-5.6.1/ieee754-1.1.13/index.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/buffer-5.6.1/index.js" style="color: #35c3eb;">strava-balance/buffer-5.6.1/index.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/fit-parser-Updated.js" style="color: #cdaaca;">strava-balance/fit-parser-Updated.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/fit-parser.js" style="color: #5ee222;">strava-balance/fit-parser.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/fit.js" style="color: #8c94af;">strava-balance/fit.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/messages.js" style="color: #cd89ab;">strava-balance/messages.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/strava-fit-parser.js" style="color: #c7a1ca;">strava-balance/strava-fit-parser.js</a></li>
<h2 style="color: #cbae04;">YAML</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/dependabot.yml" style="color: #fb9130;">.github/dependabot.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/labeler.yml" style="color: #289f51;">.github/labeler.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/ActionLint.yml" style="color: #97d31d;">.github/workflows/ActionLint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/Bandit.yml" style="color: #32c57e;">.github/workflows/Bandit.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/Snake.yml" style="color: #e09902;">.github/workflows/Snake.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/black-formatter.yml" style="color: #32cd8a;">.github/workflows/black-formatter.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/codeql.yml" style="color: #a686aa;">.github/workflows/codeql.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/defender.yml" style="color: #b5b03e;">.github/workflows/defender.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/deno.yml" style="color: #dd8313;">.github/workflows/deno.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/dependency-review.yml" style="color: #3dabee;">.github/workflows/dependency-review.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/devskim.yml" style="color: #4fa326;">.github/workflows/devskim.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/eslint.yml" style="color: #b7ad6f;">.github/workflows/eslint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/generate-file-list.yml" style="color: #79b81c;">.github/workflows/generate-file-list.yml</a></li></ul>`;
                            break;
                        case 'file-list-8':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/greetings.yml" style="color: #6e90ab;">.github/workflows/greetings.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/label.yml" style="color: #d68a15;">.github/workflows/label.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/ossar.yml" style="color: #5a83ef;">.github/workflows/ossar.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/osv-scanner.yml" style="color: #c3c028;">.github/workflows/osv-scanner.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/scorecards.yml" style="color: #35b38b;">.github/workflows/scorecards.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/semgrep.yml" style="color: #ddb792;">.github/workflows/semgrep.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/sitemap.yml" style="color: #f2a3ce;">.github/workflows/sitemap.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/sobelow.yml" style="color: #36b3a1;">.github/workflows/sobelow.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/stale.yml" style="color: #48a9f2;">.github/workflows/stale.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/static.yml" style="color: #fd8ddb;">.github/workflows/static.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/stylelint.yml" style="color: #e3c965;">.github/workflows/stylelint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/super-linter.yml" style="color: #469a36;">.github/workflows/super-linter.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.markdownlint.yml" style="color: #e85ccf;">.markdownlint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.scss-lint.yml" style="color: #68a193;">.scss-lint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/_config.yml" style="color: #e894d0;">_config.yml</a></li>
<h2 style="color: #c481f7;">.github/PULL_REQUEST_TEMPLATE</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/PULL_REQUEST_TEMPLATE/pull_request_template.md" style="color: #6ee146;">.github/PULL_REQUEST_TEMPLATE/pull_request_template.md</a></li>
<h2 style="color: #98d4c9;">.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/bug_report.md" style="color: #deb079;">.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/bug_report.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/feature_request.md" style="color: #a97bbf;">.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/feature_request.md</a></li>
<h2 style="color: #62cb6d;">.vscode</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/generate_file_list.py" style="color: #987ff6;">.vscode/generate_file_list.py</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/launch.json" style="color: #d57cc6;">.vscode/launch.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/settings.json" style="color: #ecacbc;">.vscode/settings.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/tasks.json" style="color: #59c9d5;">.vscode/tasks.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/test_generate_file_list.py" style="color: #d7ab49;">.vscode/test_generate_file_list.py</a></li>
<h2 style="color: #73966e;">OldRedditNewProfilePictures</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures/Old%20Reddit%20with%20New%20Profile%20Pictures.options.json" style="color: #60924f;">OldRedditNewProfilePictures/Old Reddit with New Profile Pictures.options.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures/Old%20Reddit%20with%20New%20Profile%20Pictures.storage.json" style="color: #84b2f8;">OldRedditNewProfilePictures/Old Reddit with New Profile Pictures.storage.json</a></li>
<h2 style="color: #858e3a;">SteamCookieExtractor2</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/manifest.json" style="color: #b0c61a;">SteamCookieExtractor2/manifest.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/options.html" style="color: #38fa17;">SteamCookieExtractor2/options.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/popup.html" style="color: #688e3c;">SteamCookieExtractor2/popup.html</a></li>
<h2 style="color: #27cf44;">SteamCookieExtractor2/icons</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/icon128.png" style="color: #4de8aa;">SteamCookieExtractor2/icons/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/icon16.png" style="color: #f1745f;">SteamCookieExtractor2/icons/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/icon48.png" style="color: #789a16;">SteamCookieExtractor2/icons/icon48.png</a></li>
<h2 style="color: #64e484;">SteamCookieExtractor2/icons/images</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/images/icon128.png" style="color: #42a214;">SteamCookieExtractor2/icons/images/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/images/icon16.png" style="color: #929c46;">SteamCookieExtractor2/icons/images/icon16.png</a></li></ul>`;
                            break;
                        case 'file-list-9':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/images/icon48.png" style="color: #59df85;">SteamCookieExtractor2/icons/images/icon48.png</a></li>
<h2 style="color: #bb8566;">YouTubeTVVolumeControl</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/icon128.png" style="color: #bac007;">YouTubeTVVolumeControl/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/icon16.png" style="color: #e48c74;">YouTubeTVVolumeControl/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/icon48.png" style="color: #82b233;">YouTubeTVVolumeControl/icon48.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/manifest.json" style="color: #ee8abc;">YouTubeTVVolumeControl/manifest.json</a></li>
<h2 style="color: #878c5f;">YouTubeVolumeControl</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icon128.png" style="color: #adaadb;">YouTubeVolumeControl/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icon16.png" style="color: #ed6bec;">YouTubeVolumeControl/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icon48.png" style="color: #5bade1;">YouTubeVolumeControl/icon48.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/manifest.json" style="color: #85d029;">YouTubeVolumeControl/manifest.json</a></li>
<h2 style="color: #cfc3a0;">YouTubeVolumeControl/icons</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/icon128.png" style="color: #2cb9fc;">YouTubeVolumeControl/icons/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/icon16.png" style="color: #cc7741;">YouTubeVolumeControl/icons/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/icon48.png" style="color: #34cf18;">YouTubeVolumeControl/icons/icon48.png</a></li>
<h2 style="color: #3da966;">YouTubeVolumeControl/icons/images</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/images/icon128.png" style="color: #30d254;">YouTubeVolumeControl/icons/images/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/images/icon16.png" style="color: #cf89c1;">YouTubeVolumeControl/icons/images/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/images/icon48.png" style="color: #d899f5;">YouTubeVolumeControl/icons/images/icon48.png</a></li>
<h2 style="color: #ae7b9e;">assets</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-city-background.png" style="color: #46ca29;">assets/kiwi-city-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-default-background.png" style="color: #73b4ef;">assets/kiwi-default-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-flower-background.png" style="color: #29b6db;">assets/kiwi-flower-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-green-background.png" style="color: #49d806;">assets/kiwi-green-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-purple-background.png" style="color: #47cb6b;">assets/kiwi-purple-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-space-apple-background.png" style="color: #5197c3;">assets/kiwi-space-apple-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-swirls-background.png" style="color: #b76daa;">assets/kiwi-swirls-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-trees-background.png" style="color: #ec6c41;">assets/kiwi-trees-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-vaporwave-logo.png" style="color: #ce66b0;">assets/kiwi-vaporwave-logo.png</a></li>
<h2 style="color: #9be40a;">src</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/src/generate_file_list.py" style="color: #31d012;">src/generate_file_list.py</a></li></ul>`;
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
                    file_list_html = `<ul><h2 style="color: #29f04e;">Repo Root</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.black" style="color: #a69d33;">.black</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.copilot-instructions.md" style="color: #8be72c;">.copilot-instructions.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.editorconfig" style="color: #b88a45;">.editorconfig</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.gitignore" style="color: #e469dd;">.gitignore</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.gitleaksignore" style="color: #a883b6;">.gitleaksignore</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.hintrc" style="color: #daca76;">.hintrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.jsbeautifyrc" style="color: #34f41c;">.jsbeautifyrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.jscsrc" style="color: #5d9a61;">.jscsrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.npmrc" style="color: #2cf0d8;">.npmrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.pre-commit-config.yaml" style="color: #34b8b3;">.pre-commit-config.yaml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.pre-commit-hooks.yaml" style="color: #cebd86;">.pre-commit-hooks.yaml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierignore" style="color: #519e81;">.prettierignore</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierrc" style="color: #37ec9f;">.prettierrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierrc.noplugins" style="color: #2cc6f4;">.prettierrc.noplugins</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierrc.temp" style="color: #2cab42;">.prettierrc.temp</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.stylelintrc.json" style="color: #60dbfa;">.stylelintrc.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vale.ini" style="color: #8fb058;">.vale.ini</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CNAME" style="color: #e48e60;">CNAME</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CODE_OF_CONDUCT.md" style="color: #95c782;">CODE_OF_CONDUCT.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CONTRIBUTING.md" style="color: #8b9baf;">CONTRIBUTING.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Gemfile" style="color: #b7c4ad;">Gemfile</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Gemfile.lock" style="color: #9b8abf;">Gemfile.lock</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/KudoAll-Strava-Garmin.user.test.cjs" style="color: #61d44d;">KudoAll-Strava-Garmin.user.test.cjs</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/LICENSE" style="color: #51e11a;">LICENSE</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Microsoft.PowerShell_profile.Tests.ps1" style="color: #42c4b8;">Microsoft.PowerShell_profile.Tests.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Microsoft.PowerShell_profile.ps1" style="color: #3ee83f;">Microsoft.PowerShell_profile.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Microsoft.VSCode_profile.ps1" style="color: #f3ad4e;">Microsoft.VSCode_profile.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures.html" style="color: #9a9c7a;">OldRedditNewProfilePictures.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PrettierFormatExcludePreprocessor.ps1" style="color: #b877f6;">PrettierFormatExcludePreprocessor.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Profile.ps1" style="color: #bfd54d;">Profile.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/README.md" style="color: #3ebf3f;">README.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SECURITY.md" style="color: #7ed6eb;">SECURITY.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify-local.html" style="color: #41d6ad;">beautify-local.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify.html" style="color: #e4b876;">beautify.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/convertHexToRgba.html" style="color: #c58ed0;">convertHexToRgba.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/cyclingCalculators.html" style="color: #40a3d6;">cyclingCalculators.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/deno.json" style="color: #27ec88;">deno.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/deno.lock" style="color: #c77f0b;">deno.lock</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/eslint.config.mjs" style="color: #3ce001;">eslint.config.mjs</a></li></ul>`;
                    break;
                case 'file-list-2':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/favicon.ico" style="color: #cb8bd1;">favicon.ico</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/favicon.png" style="color: #8c928d;">favicon.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/file_list.html" style="color: #98d079;">file_list.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/file_list.md" style="color: #9aa0d0;">file_list.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/generate_gemfile.rb" style="color: #5e84f6;">generate_gemfile.rb</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/jsconfig.json" style="color: #a7c3cb;">jsconfig.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/package-lock.json" style="color: #87d399;">package-lock.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/package.json" style="color: #b7c2f0;">package.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/requirements.txt" style="color: #60a572;">requirements.txt</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/robots.txt" style="color: #f757d6;">robots.txt</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/sitemap.xml" style="color: #cb7661;">sitemap.xml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/useragent-switcher-preferences.json" style="color: #53fa1d;">useragent-switcher-preferences.json</a></li>
<h2 style="color: #438ed6;">Userstyles</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/17track.net-DarkMode.user.css" style="color: #fd66c3;">17track.net-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ActivityFixDarkMode.user.css" style="color: #42bc59;">ActivityFixDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Archive.orgNightTheme%28Updated%29.user.css" style="color: #23bd57;">Archive.orgNightTheme(Updated).user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Benjdd-dark.user.css" style="color: #4cb017;">Benjdd-dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CFG.tf-DarkMode.user.css" style="color: #35e43c;">CFG.tf-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CSSGradient-DarkMode.user.css" style="color: #ada904;">CSSGradient-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CSSPortal-Dark.user.css" style="color: #81818f;">CSSPortal-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Copilot-Microsoft-Blackmode.user.css" style="color: #58a556;">Copilot-Microsoft-Blackmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CrystalMathLabs-BlackMode.user.css" style="color: #bea503;">CrystalMathLabs-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/DCRainMaker-DarkMode.user.css" style="color: #c29771;">DCRainMaker-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Dearrow-RemoveDearrowButton.user.css" style="color: #62c78e;">Dearrow-RemoveDearrowButton.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/DeepSeek-DarkMode.user.css" style="color: #8b88c9;">DeepSeek-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ESPN-DarkMode.user.css" style="color: #76e498;">ESPN-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/FandomDark.user.css" style="color: #cdad8a;">FandomDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Favero-DarkMode.user.css" style="color: #d79b18;">Favero-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Fedex.com-DarkMode.user.css" style="color: #31eb6f;">Fedex.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/FitFileViewer-DarkTheme.user.css" style="color: #2fcba3;">FitFileViewer-DarkTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/FiveServer-DarkMode.user.css" style="color: #519d1b;">FiveServer-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GOTOES.org-DarkMode.user.css" style="color: #2ae704;">GOTOES.org-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GTBikeV-DarkMode.user.css" style="color: #369dd9;">GTBikeV-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminBadges-DarkMode.user.css" style="color: #2fe109;">GarminBadges-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminConnectDark.user.css" style="color: #a89c71;">GarminConnectDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminRumors-DarkMode.user.css" style="color: #5984d5;">GarminRumors-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GreasyForkDark.user.css" style="color: #f06b2b;">GreasyForkDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Gyazo-DarkMode.user.css" style="color: #f85b90;">Gyazo-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Kiwifarms-Black.user.css" style="color: #e56791;">Kiwifarms-Black.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Kiwifarms-Halloween.user.css" style="color: #e290c3;">Kiwifarms-Halloween.user.css</a></li></ul>`;
                    break;
                case 'file-list-3':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Kiwifarms-Vaporwave.user.css" style="color: #809543;">Kiwifarms-Vaporwave.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Klimat.app-DarkMode.user.css" style="color: #c19ec1;">Klimat.app-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MarkdownViewer%2B%2BTheme.user.css" style="color: #5cbf9e;">MarkdownViewer++Theme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Medicare-Gov-Dark-Mode.user.css" style="color: #bfaec0;">Medicare-Gov-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MyBikeTraffic-DarkMode.user.css" style="color: #6180dc;">MyBikeTraffic-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MyWorkoutCompanion-Dark.user.css" style="color: #79a0fe;">MyWorkoutCompanion-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Nascar.com-DarkMode.user.css" style="color: #a6888e;">Nascar.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/NewYorkerDarkMode.user.css" style="color: #39fa58;">NewYorkerDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/NewYorkerSimpleDarkMode.user.css" style="color: #a7c968;">NewYorkerSimpleDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRS-HiScores-BlackMode.user.css" style="color: #e56f46;">OSRS-HiScores-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWorldHeatmap-Dark.user.css" style="color: #767ce0;">OSRSWorldHeatmap-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OsrsWikiDarkMode.user.css" style="color: #f5b653;">OsrsWikiDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Papertrails-DarkMode.user.css" style="color: #d5a188;">Papertrails-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PathFinderW3School-Dark.user.css" style="color: #81a9bd;">PathFinderW3School-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PowerMeter.cc-DarkMode.user.css" style="color: #999a40;">PowerMeter.cc-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PromptHero-Dark.user.css" style="color: #27c159;">PromptHero-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RedditColoredComments.user.css" style="color: #b17570;">RedditColoredComments.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Scrap.tf-BlackTheme.user.css" style="color: #bf9b24;">Scrap.tf-BlackTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Skial-CustomTheme.user.css" style="color: #eea450;">Skial-CustomTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SportSurge-BlackMode.user.css" style="color: #d595b1;">SportSurge-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SquadRats-Dark.user.css" style="color: #ccb512;">SquadRats-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Statshunters-Dark.user.css" style="color: #44c5d4;">Statshunters-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamDB-Black-Mode.user.css" style="color: #25e08e;">SteamDB-Black-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamDB-Dark-Mode.user.css" style="color: #869951;">SteamDB-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Brawlhalla.user.css" style="color: #9ab70e;">SteamStat.us-Re-Remastered-Brawlhalla.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Christmas-Style.user.css" style="color: #afcf02;">SteamStat.us-Re-Remastered-Christmas-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Detroit-Lions-Style.user.css" style="color: #87ed07;">SteamStat.us-Re-Remastered-Detroit-Lions-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Detroit-Tigers.user.css" style="color: #f38476;">SteamStat.us-Re-Remastered-Detroit-Tigers.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Easter-Style.user.css" style="color: #faafba;">SteamStat.us-Re-Remastered-Easter-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Green-BlackStyle.user.css" style="color: #d161cb;">SteamStat.us-Re-Remastered-Green-BlackStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Halloween-Style.user.css" style="color: #5daeb2;">SteamStat.us-Re-Remastered-Halloween-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Lime%20Green-Purple%20Style.user.css" style="color: #2dfc17;">SteamStat.us-Re-Remastered-Lime Green-Purple Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Miami-Heat.user.css" style="color: #86d22c;">SteamStat.us-Re-Remastered-Miami-Heat.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-NASCAR.user.css" style="color: #e0b3c0;">SteamStat.us-Re-Remastered-NASCAR.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Orange-BlackStyle.user.css" style="color: #a2d617;">SteamStat.us-Re-Remastered-Orange-BlackStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-PCMasterRace.user.css" style="color: #46de79;">SteamStat.us-Re-Remastered-PCMasterRace.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Pink-BlackStyle.user.css" style="color: #8c8fb1;">SteamStat.us-Re-Remastered-Pink-BlackStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Purple.user.css" style="color: #908196;">SteamStat.us-Re-Remastered-Purple.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-RainbowStyle.user.css" style="color: #b2d561;">SteamStat.us-Re-Remastered-RainbowStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-SteamStyle.user.css" style="color: #c1b99e;">SteamStat.us-Re-Remastered-SteamStyle.user.css</a></li></ul>`;
                    break;
                case 'file-list-4':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Sunset-Style.user.css" style="color: #8e95b9;">SteamStat.us-Re-Remastered-Sunset-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-TeamFortress2.user.css" style="color: #d3a6e6;">SteamStat.us-Re-Remastered-TeamFortress2.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-The-Crew-Motorfest.user.css" style="color: #56f303;">SteamStat.us-Re-Remastered-The-Crew-Motorfest.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-TourDeFrance.user.css" style="color: #6fbe3f;">SteamStat.us-Re-Remastered-TourDeFrance.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-USA-Style.user.css" style="color: #ba90b7;">SteamStat.us-Re-Remastered-USA-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Windows95.user.css" style="color: #e28e65;">SteamStat.us-Re-Remastered-Windows95.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Witcher3.user.css" style="color: #dcb0fa;">SteamStat.us-Re-Remastered-Witcher3.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Wolverines-Style.user.css" style="color: #b86dee;">SteamStat.us-Re-Remastered-Wolverines-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-WorldOfWarcraft.user.css" style="color: #53c9a5;">SteamStat.us-Re-Remastered-WorldOfWarcraft.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Zwift.user.css" style="color: #d9c3a6;">SteamStat.us-Re-Remastered-Zwift.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered.user.css" style="color: #b69a3c;">SteamStat.us-Re-Remastered.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamTradeMatcher-DarkMode.user.css" style="color: #bad918;">SteamTradeMatcher-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StepSecurityDarkMode.user.css" style="color: #41c03b;">StepSecurityDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaAutoDarkTheme.user.css" style="color: #9da5b4;">StravaAutoDarkTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaStratTracker-DarkMode.user.css" style="color: #76d0c0;">StravaStratTracker-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StreamingSitesStreamsBlackDarkMode.user.css" style="color: #45a05d;">StreamingSitesStreamsBlackDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Stylus-DarkTheme-Updated.user.css" style="color: #d89deb;">Stylus-DarkTheme-Updated.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StylusEditorChromeDark-Fixed.user.css" style="color: #78b7b6;">StylusEditorChromeDark-Fixed.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StylusFluent-Updated.user.css" style="color: #34ac79;">StylusFluent-Updated.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TamperMonkey-DarkGreen.user.css" style="color: #95a689;">TamperMonkey-DarkGreen.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TamperMonkey-DarkMode.user.css" style="color: #2db164;">TamperMonkey-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TeamFortressWIki-Dark.user.css" style="color: #a38fdf;">TeamFortressWIki-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TechPowerUp-DarkMode.user.css" style="color: #73c2e1;">TechPowerUp-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TrainingPeaks-DarkMode.user.css" style="color: #ec98a9;">TrainingPeaks-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UPS.com-DarkMode.user.css" style="color: #b6bc6c;">UPS.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Unroll.me-DarkMode.user.css" style="color: #729695;">Unroll.me-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UptimeRobotDark.user.css" style="color: #f2a6de;">UptimeRobotDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserStyle-Root-ColorTemplate.user.css" style="color: #d894bc;">UserStyle-Root-ColorTemplate.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserscriptTemplate.user.css" style="color: #d1b5ef;">UserscriptTemplate.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserscriptZone-Dark.user.css" style="color: #e774fc;">UserscriptZone-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserstyleWorld-DarkBamaBraves.user.css" style="color: #fd65fd;">UserstyleWorld-DarkBamaBraves.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/VisualStudioCode-DarkMode.user.css" style="color: #f8a5b6;">VisualStudioCode-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/WahooFitnessDarkMode.user.css" style="color: #5fcaf2;">WahooFitnessDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Walmart.com-DarkMode.user.css" style="color: #cfbd14;">Walmart.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wanderer-Dark.user.css" style="color: #c29a6d;">Wanderer-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Weather.com-DarkMode.user.css" style="color: #3da8bb;">Weather.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/WebHint-Dark.user.css" style="color: #53a5df;">WebHint-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wigle-DarkMode-Beta.user.css" style="color: #559b4a;">Wigle-DarkMode-Beta.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wigle-DarkMode.user.css" style="color: #bb9c99;">Wigle-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wikipedia-OLED-SettingsPage.user.css" style="color: #d3cd0f;">Wikipedia-OLED-SettingsPage.user.css</a></li></ul>`;
                    break;
                case 'file-list-5':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Windy-DarkMode.user.css" style="color: #7ebec5;">Windy-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YT-Vibra.user.css" style="color: #b0a1f5;">YT-Vibra.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeRainbowProgress.user.css" style="color: #a9955f;">YoutubeRainbowProgress.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeScrubberColors.user.css" style="color: #f89d7a;">YoutubeScrubberColors.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeTV-BlackMode.user.css" style="color: #957e86;">YoutubeTV-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Zwift.com-Dark-Mode.user.css" style="color: #24c489;">Zwift.com-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwiftHacks-DarkMode.user.css" style="color: #bd6bfc;">ZwiftHacks-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwiftInsiderDarkMode.user.css" style="color: #96bc7a;">ZwiftInsiderDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwiftPower.comDark%20Mode.user.css" style="color: #fda122;">ZwiftPower.comDark Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Zwiftalizer.com-Darker-Mode.user.css" style="color: #27de59;">Zwiftalizer.com-Darker-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwifterBikesDarkMode.user.css" style="color: #90c88c;">ZwifterBikesDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/abcnews.go.com-DarkMode.user.css" style="color: #26e42a;">abcnews.go.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/bicycling-DarkMode.user.css" style="color: #65a238;">bicycling-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/detroitmi.gov-DarkMode.user.css" style="color: #9ea28d;">detroitmi.gov-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ebay-Dark-Mode.user.css" style="color: #9cbb18;">ebay-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/findthatride-darkmode.user.css" style="color: #3dc955;">findthatride-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/fitfiletools-darkmode.user.css" style="color: #e8a6e1;">fitfiletools-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/fivethirtyeight.comDarkMode.user.css" style="color: #cdbc4b;">fivethirtyeight.comDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/jalopnik.com-DarkMode.user.css" style="color: #5fb9f2;">jalopnik.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/kom.club-darkmode.user.css" style="color: #ffc228;">kom.club-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/makinolo.com-Dark-Mode.user.css" style="color: #cec078;">makinolo.com-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/michigan.gov-DarkMode.user.css" style="color: #988cf0;">michigan.gov-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/mywindsock-darkmode.user.css" style="color: #cf64bb;">mywindsock-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/nbcwashington.com-DarkMode.user.css" style="color: #cbb054;">nbcwashington.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/nytimes.com-DarkModeSimple.user.css" style="color: #3cef7a;">nytimes.com-DarkModeSimple.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/p337info-tf2.user.css" style="color: #3cf905;">p337info-tf2.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/runalyze-darkmode.user.css" style="color: #9494cd;">runalyze-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/stravatoolbox-darkmode.user.css" style="color: #29a974;">stravatoolbox-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/veloviewer-darkmode.user.css" style="color: #c4ce3c;">veloviewer-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/zwifthub.com-darkmode.user.css" style="color: #9abf04;">zwifthub.com-darkmode.user.css</a></li>
<h2 style="color: #5b9e93;">Userscripts</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/AscentDescentMetersToFeet.user.js" style="color: #5ce058;">AscentDescentMetersToFeet.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/AutoMergeDependabotPRs.user.js" style="color: #7a8a4e;">AutoMergeDependabotPRs.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/DeleteYoutubePlaylists.user.js" style="color: #3ccf96;">DeleteYoutubePlaylists.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnhanceYouTubeProfilePictures.user.js" style="color: #2fb858;">EnhanceYouTubeProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnlargeKiwifarmsProfilePictures.user.js" style="color: #8edf4d;">EnlargeKiwifarmsProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnlargeYouTubeChatProfilePictures.user.js" style="color: #5aec24;">EnlargeYouTubeChatProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnlargeYouTubeCommentSectionProfilePictures.user.js" style="color: #3bd340;">EnlargeYouTubeCommentSectionProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GOTOESFitFileEditor-AutoClosePopup.user.js" style="color: #6697f8;">GOTOESFitFileEditor-AutoClosePopup.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminConnectRemoveGear.user.js" style="color: #229bbe;">GarminConnectRemoveGear.user.js</a></li></ul>`;
                    break;
                case 'file-list-6':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GithubMarkMergedDone.user.js" style="color: #79d277;">GithubMarkMergedDone.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GyazoDirectLink.user.js" style="color: #d961b8;">GyazoDirectLink.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/HideChineseUserstyles.user.js" style="color: #877edc;">HideChineseUserstyles.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/HideNon-EnglishUserstyles.user.js" style="color: #eb76c8;">HideNon-EnglishUserstyles.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/KudoAll-Strava-Garmin.user.js" style="color: #72c715;">KudoAll-Strava-Garmin.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MergeDependabotPRs.user.js" style="color: #c7938a;">MergeDependabotPRs.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWikiAuto-Categorizer-SlowMode.user.js" style="color: #c5beec;">OSRSWikiAuto-Categorizer-SlowMode.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWikiAuto-Categorizer.user.js" style="color: #2ccee4;">OSRSWikiAuto-Categorizer.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWikiAuto-Navbox-SlowMode.user.js" style="color: #e95db8;">OSRSWikiAuto-Navbox-SlowMode.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-API-Key-Version-Reddit-Only-Version.user.js" style="color: #64c76d;">OldRedditNewProfilePictures-API-Key-Version-Reddit-Only-Version.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-API-Key-Version-Reddit-Stream-Version.user.js" style="color: #d88541;">OldRedditNewProfilePictures-API-Key-Version-Reddit-Stream-Version.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-API-Key-Version.user.js" style="color: #9a72dd;">OldRedditNewProfilePictures-API-Key-Version.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-UniversalVersion.user.js" style="color: #54f36d;">OldRedditNewProfilePictures-UniversalVersion.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures.user.js" style="color: #ca883c;">OldRedditNewProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures/Old%20Reddit%20with%20New%20Profile%20Pictures.user.js" style="color: #81a791;">OldRedditNewProfilePictures/Old Reddit with New Profile Pictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RedditStreamAutoRefresher.user.js" style="color: #ab7389;">RedditStreamAutoRefresher.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RedditStreamAutoRefresherFaster.user.js" style="color: #5ca353;">RedditStreamAutoRefresherFaster.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RightClickEnable.user.js" style="color: #f16e94;">RightClickEnable.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaAutoAuthorize.user.js" style="color: #3ea145;">StravaAutoAuthorize.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaTextAuto-Selector.user.js" style="color: #bd9d77;">StravaTextAuto-Selector.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SuperchargedLocalDirectoryWebUI.user.js" style="color: #80b6de;">SuperchargedLocalDirectoryWebUI.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserstyleWorld-SyncStyles.user.js" style="color: #d46986;">UserstyleWorld-SyncStyles.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTV-Volume-Rememberer.user.js" style="color: #57d165;">YouTubeTV-Volume-Rememberer.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl.user.js" style="color: #66a128;">YouTubeTVVolumeControl.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl.user.js" style="color: #65d61a;">YouTubeVolumeControl.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeVolumeDisplay.user.js" style="color: #6896dd;">YoutubeVolumeDisplay.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Zwift-Give-RideOns-to-Everyone.user.js" style="color: #a395dc;">Zwift-Give-RideOns-to-Everyone.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/reddit-stream-Enhancements.user.js" style="color: #68acc9;">reddit-stream-Enhancements.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-Add-Balance-Original.user.js" style="color: #83854a;">strava-balance/Strava-Add-Balance-Original.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-Add-Balance-Updated.user.js" style="color: #81e047;">strava-balance/Strava-Add-Balance-Updated.user.js</a></li>
<h2 style="color: #f177bb;">CSS</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Discord-Dark%2B-Default-Member-List.css" style="color: #6cb2a0;">Discord-Dark+-Default-Member-List.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/styles.css" style="color: #c28107;">YouTubeVolumeControl/styles.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.css" style="color: #b3c7d9;">codemirror.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.min.css" style="color: #3aecf8;">codemirror.min.css</a></li>
<h2 style="color: #81c46c;">JavaScript</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.eslintrc.js" style="color: #2793dc;">.eslintrc.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/background.js" style="color: #70a209;">SteamCookieExtractor2/background.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/content.js" style="color: #7eadb8;">SteamCookieExtractor2/content.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/options.js" style="color: #6b8871;">SteamCookieExtractor2/options.js</a></li></ul>`;
                    break;
                case 'file-list-7':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/popup.js" style="color: #66a6fe;">SteamCookieExtractor2/popup.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/WIndyPlugin.min.js" style="color: #a8da29;">WIndyPlugin.min.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/background.js" style="color: #ca8095;">YouTubeTVVolumeControl/background.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/content.js" style="color: #8490dc;">YouTubeTVVolumeControl/content.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/background.js" style="color: #928bf7;">YouTubeVolumeControl/background.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/content.js" style="color: #95bdf7;">YouTubeVolumeControl/content.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify-css-mod.js" style="color: #f176f5;">beautify-css-mod.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify.js" style="color: #84b302;">beautify.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.js" style="color: #3ddc07;">codemirror.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.min.js" style="color: #ec70fe;">codemirror.min.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/convertHexToRgba.js" style="color: #4ac784;">convertHexToRgba.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/css.js" style="color: #a0e12a;">css.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/css.min.js" style="color: #59ae1b;">css.min.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/cyclingCalculators.js" style="color: #36b18a;">cyclingCalculators.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-AddBalance-Updated.js" style="color: #a3a4a3;">strava-balance/Strava-AddBalance-Updated.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-AddBalance.js" style="color: #dba6d6;">strava-balance/Strava-AddBalance.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/binary-Updated.js" style="color: #e49576;">strava-balance/binary-Updated.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/binary.js" style="color: #8d7a9a;">strava-balance/binary.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/buffer-5.6.1/base64-js-1.3.1/index.js" style="color: #9ea7ce;">strava-balance/buffer-5.6.1/base64-js-1.3.1/index.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/buffer-5.6.1/ieee754-1.1.13/index.js" style="color: #bfc25a;">strava-balance/buffer-5.6.1/ieee754-1.1.13/index.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/buffer-5.6.1/index.js" style="color: #35c3eb;">strava-balance/buffer-5.6.1/index.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/fit-parser-Updated.js" style="color: #cdaaca;">strava-balance/fit-parser-Updated.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/fit-parser.js" style="color: #5ee222;">strava-balance/fit-parser.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/fit.js" style="color: #8c94af;">strava-balance/fit.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/messages.js" style="color: #cd89ab;">strava-balance/messages.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/strava-fit-parser.js" style="color: #c7a1ca;">strava-balance/strava-fit-parser.js</a></li>
<h2 style="color: #cbae04;">YAML</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/dependabot.yml" style="color: #fb9130;">.github/dependabot.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/labeler.yml" style="color: #289f51;">.github/labeler.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/ActionLint.yml" style="color: #97d31d;">.github/workflows/ActionLint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/Bandit.yml" style="color: #32c57e;">.github/workflows/Bandit.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/Snake.yml" style="color: #e09902;">.github/workflows/Snake.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/black-formatter.yml" style="color: #32cd8a;">.github/workflows/black-formatter.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/codeql.yml" style="color: #a686aa;">.github/workflows/codeql.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/defender.yml" style="color: #b5b03e;">.github/workflows/defender.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/deno.yml" style="color: #dd8313;">.github/workflows/deno.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/dependency-review.yml" style="color: #3dabee;">.github/workflows/dependency-review.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/devskim.yml" style="color: #4fa326;">.github/workflows/devskim.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/eslint.yml" style="color: #b7ad6f;">.github/workflows/eslint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/generate-file-list.yml" style="color: #79b81c;">.github/workflows/generate-file-list.yml</a></li></ul>`;
                    break;
                case 'file-list-8':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/greetings.yml" style="color: #6e90ab;">.github/workflows/greetings.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/label.yml" style="color: #d68a15;">.github/workflows/label.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/ossar.yml" style="color: #5a83ef;">.github/workflows/ossar.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/osv-scanner.yml" style="color: #c3c028;">.github/workflows/osv-scanner.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/scorecards.yml" style="color: #35b38b;">.github/workflows/scorecards.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/semgrep.yml" style="color: #ddb792;">.github/workflows/semgrep.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/sitemap.yml" style="color: #f2a3ce;">.github/workflows/sitemap.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/sobelow.yml" style="color: #36b3a1;">.github/workflows/sobelow.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/stale.yml" style="color: #48a9f2;">.github/workflows/stale.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/static.yml" style="color: #fd8ddb;">.github/workflows/static.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/stylelint.yml" style="color: #e3c965;">.github/workflows/stylelint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/super-linter.yml" style="color: #469a36;">.github/workflows/super-linter.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.markdownlint.yml" style="color: #e85ccf;">.markdownlint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.scss-lint.yml" style="color: #68a193;">.scss-lint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/_config.yml" style="color: #e894d0;">_config.yml</a></li>
<h2 style="color: #c481f7;">.github/PULL_REQUEST_TEMPLATE</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/PULL_REQUEST_TEMPLATE/pull_request_template.md" style="color: #6ee146;">.github/PULL_REQUEST_TEMPLATE/pull_request_template.md</a></li>
<h2 style="color: #98d4c9;">.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/bug_report.md" style="color: #deb079;">.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/bug_report.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/feature_request.md" style="color: #a97bbf;">.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/feature_request.md</a></li>
<h2 style="color: #62cb6d;">.vscode</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/generate_file_list.py" style="color: #987ff6;">.vscode/generate_file_list.py</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/launch.json" style="color: #d57cc6;">.vscode/launch.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/settings.json" style="color: #ecacbc;">.vscode/settings.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/tasks.json" style="color: #59c9d5;">.vscode/tasks.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/test_generate_file_list.py" style="color: #d7ab49;">.vscode/test_generate_file_list.py</a></li>
<h2 style="color: #73966e;">OldRedditNewProfilePictures</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures/Old%20Reddit%20with%20New%20Profile%20Pictures.options.json" style="color: #60924f;">OldRedditNewProfilePictures/Old Reddit with New Profile Pictures.options.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures/Old%20Reddit%20with%20New%20Profile%20Pictures.storage.json" style="color: #84b2f8;">OldRedditNewProfilePictures/Old Reddit with New Profile Pictures.storage.json</a></li>
<h2 style="color: #858e3a;">SteamCookieExtractor2</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/manifest.json" style="color: #b0c61a;">SteamCookieExtractor2/manifest.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/options.html" style="color: #38fa17;">SteamCookieExtractor2/options.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/popup.html" style="color: #688e3c;">SteamCookieExtractor2/popup.html</a></li>
<h2 style="color: #27cf44;">SteamCookieExtractor2/icons</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/icon128.png" style="color: #4de8aa;">SteamCookieExtractor2/icons/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/icon16.png" style="color: #f1745f;">SteamCookieExtractor2/icons/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/icon48.png" style="color: #789a16;">SteamCookieExtractor2/icons/icon48.png</a></li>
<h2 style="color: #64e484;">SteamCookieExtractor2/icons/images</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/images/icon128.png" style="color: #42a214;">SteamCookieExtractor2/icons/images/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/images/icon16.png" style="color: #929c46;">SteamCookieExtractor2/icons/images/icon16.png</a></li></ul>`;
                    break;
                case 'file-list-9':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/images/icon48.png" style="color: #59df85;">SteamCookieExtractor2/icons/images/icon48.png</a></li>
<h2 style="color: #bb8566;">YouTubeTVVolumeControl</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/icon128.png" style="color: #bac007;">YouTubeTVVolumeControl/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/icon16.png" style="color: #e48c74;">YouTubeTVVolumeControl/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/icon48.png" style="color: #82b233;">YouTubeTVVolumeControl/icon48.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/manifest.json" style="color: #ee8abc;">YouTubeTVVolumeControl/manifest.json</a></li>
<h2 style="color: #878c5f;">YouTubeVolumeControl</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icon128.png" style="color: #adaadb;">YouTubeVolumeControl/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icon16.png" style="color: #ed6bec;">YouTubeVolumeControl/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icon48.png" style="color: #5bade1;">YouTubeVolumeControl/icon48.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/manifest.json" style="color: #85d029;">YouTubeVolumeControl/manifest.json</a></li>
<h2 style="color: #cfc3a0;">YouTubeVolumeControl/icons</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/icon128.png" style="color: #2cb9fc;">YouTubeVolumeControl/icons/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/icon16.png" style="color: #cc7741;">YouTubeVolumeControl/icons/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/icon48.png" style="color: #34cf18;">YouTubeVolumeControl/icons/icon48.png</a></li>
<h2 style="color: #3da966;">YouTubeVolumeControl/icons/images</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/images/icon128.png" style="color: #30d254;">YouTubeVolumeControl/icons/images/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/images/icon16.png" style="color: #cf89c1;">YouTubeVolumeControl/icons/images/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/images/icon48.png" style="color: #d899f5;">YouTubeVolumeControl/icons/images/icon48.png</a></li>
<h2 style="color: #ae7b9e;">assets</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-city-background.png" style="color: #46ca29;">assets/kiwi-city-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-default-background.png" style="color: #73b4ef;">assets/kiwi-default-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-flower-background.png" style="color: #29b6db;">assets/kiwi-flower-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-green-background.png" style="color: #49d806;">assets/kiwi-green-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-purple-background.png" style="color: #47cb6b;">assets/kiwi-purple-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-space-apple-background.png" style="color: #5197c3;">assets/kiwi-space-apple-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-swirls-background.png" style="color: #b76daa;">assets/kiwi-swirls-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-trees-background.png" style="color: #ec6c41;">assets/kiwi-trees-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-vaporwave-logo.png" style="color: #ce66b0;">assets/kiwi-vaporwave-logo.png</a></li>
<h2 style="color: #9be40a;">src</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/src/generate_file_list.py" style="color: #31d012;">src/generate_file_list.py</a></li></ul>`;
                    break;
            }
            placeholder.innerHTML = file_list_html;
        });
    }
});
</script>
