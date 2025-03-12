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
                            file_list_html = `<ul><h2 style="color: #448be3;">Repo Root</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.black" style="color: #d178bb;">.black</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.copilot-instructions.md" style="color: #f9618f;">.copilot-instructions.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.editorconfig" style="color: #5ccdd3;">.editorconfig</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.gitignore" style="color: #b5c4ac;">.gitignore</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.gitleaksignore" style="color: #d08d3d;">.gitleaksignore</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.hintrc" style="color: #f4ace9;">.hintrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.jsbeautifyrc" style="color: #9eba45;">.jsbeautifyrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.jscsrc" style="color: #68bc1c;">.jscsrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.npmrc" style="color: #be9f1d;">.npmrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.pre-commit-config.yaml" style="color: #d9acc8;">.pre-commit-config.yaml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.pre-commit-hooks.yaml" style="color: #48ae5c;">.pre-commit-hooks.yaml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierignore" style="color: #e5b1a2;">.prettierignore</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierrc" style="color: #22c666;">.prettierrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierrc.noplugins" style="color: #67c9ea;">.prettierrc.noplugins</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierrc.temp" style="color: #efa1bb;">.prettierrc.temp</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.stylelintrc.json" style="color: #888ff6;">.stylelintrc.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vale.ini" style="color: #b6c48a;">.vale.ini</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CNAME" style="color: #fcb18b;">CNAME</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CODE_OF_CONDUCT.md" style="color: #c096f5;">CODE_OF_CONDUCT.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CONTRIBUTING.md" style="color: #25f74b;">CONTRIBUTING.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Gemfile" style="color: #9a8132;">Gemfile</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Gemfile.lock" style="color: #c6a9eb;">Gemfile.lock</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/KudoAll-Strava-Garmin.user.test.cjs" style="color: #48c21b;">KudoAll-Strava-Garmin.user.test.cjs</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/LICENSE" style="color: #ed9116;">LICENSE</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Microsoft.PowerShell_profile.Tests.ps1" style="color: #3ae599;">Microsoft.PowerShell_profile.Tests.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Microsoft.PowerShell_profile.ps1" style="color: #38a4d9;">Microsoft.PowerShell_profile.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Microsoft.VSCode_profile.ps1" style="color: #2aec94;">Microsoft.VSCode_profile.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures.html" style="color: #dab179;">OldRedditNewProfilePictures.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PrettierFormatExcludePreprocessor.ps1" style="color: #caa243;">PrettierFormatExcludePreprocessor.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Profile.ps1" style="color: #ad9c7d;">Profile.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/README.md" style="color: #4dabf3;">README.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SECURITY.md" style="color: #2afd21;">SECURITY.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify-local.html" style="color: #dd811f;">beautify-local.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify.html" style="color: #4dd622;">beautify.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/convertHexToRgba.html" style="color: #65c193;">convertHexToRgba.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/cyclingCalculators.html" style="color: #98cd60;">cyclingCalculators.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/deno.json" style="color: #51e326;">deno.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/deno.lock" style="color: #e76e86;">deno.lock</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/eslint.config.mjs" style="color: #8abb1c;">eslint.config.mjs</a></li></ul>`;
                            break;
                        case 'file-list-2':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/favicon.ico" style="color: #7dacdb;">favicon.ico</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/favicon.png" style="color: #c1c9ce;">favicon.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/file_list.html" style="color: #c0883a;">file_list.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/file_list.md" style="color: #cfa77b;">file_list.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/generate_gemfile.rb" style="color: #cf85f7;">generate_gemfile.rb</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/jsconfig.json" style="color: #56d98f;">jsconfig.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/package-lock.json" style="color: #379c56;">package-lock.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/package.json" style="color: #2fa1e8;">package.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/requirements.txt" style="color: #b0af7a;">requirements.txt</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/robots.txt" style="color: #a9df35;">robots.txt</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/sitemap.xml" style="color: #bdb443;">sitemap.xml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/useragent-switcher-preferences.json" style="color: #bc6bf9;">useragent-switcher-preferences.json</a></li>
<h2 style="color: #60e44d;">Userstyles</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/17track.net-DarkMode.user.css" style="color: #2bdc12;">17track.net-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ActivityFixDarkMode.user.css" style="color: #7c9a8a;">ActivityFixDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Archive.orgNightTheme%28Updated%29.user.css" style="color: #a39e89;">Archive.orgNightTheme(Updated).user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Benjdd-dark.user.css" style="color: #aea9cb;">Benjdd-dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CFG.tf-DarkMode.user.css" style="color: #71da2f;">CFG.tf-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CSSGradient-DarkMode.user.css" style="color: #23a919;">CSSGradient-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CSSPortal-Dark.user.css" style="color: #c5a640;">CSSPortal-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Copilot-Microsoft-Blackmode.user.css" style="color: #6abc51;">Copilot-Microsoft-Blackmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CrystalMathLabs-BlackMode.user.css" style="color: #bcd05e;">CrystalMathLabs-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/DCRainMaker-DarkMode.user.css" style="color: #6da203;">DCRainMaker-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Dearrow-RemoveDearrowButton.user.css" style="color: #a989ac;">Dearrow-RemoveDearrowButton.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/DeepSeek-DarkMode.user.css" style="color: #4fa268;">DeepSeek-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ESPN-DarkMode.user.css" style="color: #ef83bf;">ESPN-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/FandomDark.user.css" style="color: #698c92;">FandomDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Favero-DarkMode.user.css" style="color: #e566cd;">Favero-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Fedex.com-DarkMode.user.css" style="color: #47bdbc;">Fedex.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/FitFileViewer-DarkTheme.user.css" style="color: #52db66;">FitFileViewer-DarkTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/FiveServer-DarkMode.user.css" style="color: #44b60c;">FiveServer-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GOTOES.org-DarkMode.user.css" style="color: #2de79d;">GOTOES.org-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GTBikeV-DarkMode.user.css" style="color: #d08801;">GTBikeV-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminBadges-DarkMode.user.css" style="color: #91de05;">GarminBadges-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminConnectDark.user.css" style="color: #24f14d;">GarminConnectDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminRumors-DarkMode.user.css" style="color: #85d7dc;">GarminRumors-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GreasyForkDark.user.css" style="color: #61eb7f;">GreasyForkDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Gyazo-DarkMode.user.css" style="color: #7fa3cc;">Gyazo-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Kiwifarms-Black.user.css" style="color: #23c2dc;">Kiwifarms-Black.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Kiwifarms-Halloween.user.css" style="color: #cc8794;">Kiwifarms-Halloween.user.css</a></li></ul>`;
                            break;
                        case 'file-list-3':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Kiwifarms-Vaporwave.user.css" style="color: #34ec84;">Kiwifarms-Vaporwave.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Klimat.app-DarkMode.user.css" style="color: #f36e12;">Klimat.app-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MarkdownViewer%2B%2BTheme.user.css" style="color: #bf934b;">MarkdownViewer++Theme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Medicare-Gov-Dark-Mode.user.css" style="color: #c6cc0f;">Medicare-Gov-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MyBikeTraffic-DarkMode.user.css" style="color: #bcc0fa;">MyBikeTraffic-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MyWorkoutCompanion-Dark.user.css" style="color: #48bd9e;">MyWorkoutCompanion-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Nascar.com-DarkMode.user.css" style="color: #3ec4d4;">Nascar.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/NewYorkerDarkMode.user.css" style="color: #41cd03;">NewYorkerDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/NewYorkerSimpleDarkMode.user.css" style="color: #e78d4b;">NewYorkerSimpleDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRS-HiScores-BlackMode.user.css" style="color: #d77c8d;">OSRS-HiScores-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWorldHeatmap-Dark.user.css" style="color: #2ba430;">OSRSWorldHeatmap-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OsrsWikiDarkMode.user.css" style="color: #db7709;">OsrsWikiDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Papertrails-DarkMode.user.css" style="color: #d97693;">Papertrails-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PathFinderW3School-Dark.user.css" style="color: #f9aaf2;">PathFinderW3School-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PowerMeter.cc-DarkMode.user.css" style="color: #8fb08f;">PowerMeter.cc-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PromptHero-Dark.user.css" style="color: #50e71b;">PromptHero-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RedditColoredComments.user.css" style="color: #8db747;">RedditColoredComments.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Scrap.tf-BlackTheme.user.css" style="color: #c27e8a;">Scrap.tf-BlackTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Skial-CustomTheme.user.css" style="color: #25abd4;">Skial-CustomTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SportSurge-BlackMode.user.css" style="color: #d8a5f7;">SportSurge-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SquadRats-Dark.user.css" style="color: #8ad31f;">SquadRats-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Statshunters-Dark.user.css" style="color: #4deba3;">Statshunters-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamDB-Black-Mode.user.css" style="color: #95cf49;">SteamDB-Black-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamDB-Dark-Mode.user.css" style="color: #31e807;">SteamDB-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Brawlhalla.user.css" style="color: #7896a2;">SteamStat.us-Re-Remastered-Brawlhalla.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Christmas-Style.user.css" style="color: #78bb11;">SteamStat.us-Re-Remastered-Christmas-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Detroit-Lions-Style.user.css" style="color: #edb2d7;">SteamStat.us-Re-Remastered-Detroit-Lions-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Detroit-Tigers.user.css" style="color: #26d8de;">SteamStat.us-Re-Remastered-Detroit-Tigers.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Easter-Style.user.css" style="color: #c9d510;">SteamStat.us-Re-Remastered-Easter-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Green-BlackStyle.user.css" style="color: #77b43f;">SteamStat.us-Re-Remastered-Green-BlackStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Halloween-Style.user.css" style="color: #db6c54;">SteamStat.us-Re-Remastered-Halloween-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Lime%20Green-Purple%20Style.user.css" style="color: #a6aa61;">SteamStat.us-Re-Remastered-Lime Green-Purple Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Miami-Heat.user.css" style="color: #fe5c7f;">SteamStat.us-Re-Remastered-Miami-Heat.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-NASCAR.user.css" style="color: #60a8c5;">SteamStat.us-Re-Remastered-NASCAR.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Orange-BlackStyle.user.css" style="color: #bccea8;">SteamStat.us-Re-Remastered-Orange-BlackStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-PCMasterRace.user.css" style="color: #d9afe9;">SteamStat.us-Re-Remastered-PCMasterRace.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Pink-BlackStyle.user.css" style="color: #9a7fda;">SteamStat.us-Re-Remastered-Pink-BlackStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Purple.user.css" style="color: #daa64f;">SteamStat.us-Re-Remastered-Purple.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-RainbowStyle.user.css" style="color: #b1c62e;">SteamStat.us-Re-Remastered-RainbowStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-SteamStyle.user.css" style="color: #5de18b;">SteamStat.us-Re-Remastered-SteamStyle.user.css</a></li></ul>`;
                            break;
                        case 'file-list-4':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Sunset-Style.user.css" style="color: #759b64;">SteamStat.us-Re-Remastered-Sunset-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-TeamFortress2.user.css" style="color: #2ee16d;">SteamStat.us-Re-Remastered-TeamFortress2.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-The-Crew-Motorfest.user.css" style="color: #61de6e;">SteamStat.us-Re-Remastered-The-Crew-Motorfest.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-TourDeFrance.user.css" style="color: #f9afd4;">SteamStat.us-Re-Remastered-TourDeFrance.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-USA-Style.user.css" style="color: #3ff342;">SteamStat.us-Re-Remastered-USA-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Windows95.user.css" style="color: #e4c61f;">SteamStat.us-Re-Remastered-Windows95.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Witcher3.user.css" style="color: #2bde2b;">SteamStat.us-Re-Remastered-Witcher3.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Wolverines-Style.user.css" style="color: #599c39;">SteamStat.us-Re-Remastered-Wolverines-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-WorldOfWarcraft.user.css" style="color: #5fd41b;">SteamStat.us-Re-Remastered-WorldOfWarcraft.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Zwift.user.css" style="color: #98b46b;">SteamStat.us-Re-Remastered-Zwift.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered.user.css" style="color: #a3cdd9;">SteamStat.us-Re-Remastered.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamTradeMatcher-DarkMode.user.css" style="color: #ee851a;">SteamTradeMatcher-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StepSecurityDarkMode.user.css" style="color: #fca064;">StepSecurityDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaAutoDarkTheme.user.css" style="color: #75ab97;">StravaAutoDarkTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaStratTracker-DarkMode.user.css" style="color: #f188ea;">StravaStratTracker-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StreamingSitesStreamsBlackDarkMode.user.css" style="color: #868e43;">StreamingSitesStreamsBlackDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Stylus-DarkTheme-Updated.user.css" style="color: #92b519;">Stylus-DarkTheme-Updated.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StylusEditorChromeDark-Fixed.user.css" style="color: #5bb921;">StylusEditorChromeDark-Fixed.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StylusFluent-Updated.user.css" style="color: #f48f3d;">StylusFluent-Updated.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TamperMonkey-DarkGreen.user.css" style="color: #97c8dc;">TamperMonkey-DarkGreen.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TamperMonkey-DarkMode.user.css" style="color: #2abf25;">TamperMonkey-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TeamFortressWIki-Dark.user.css" style="color: #8dd886;">TeamFortressWIki-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TechPowerUp-DarkMode.user.css" style="color: #6490d6;">TechPowerUp-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TrainingPeaks-DarkMode.user.css" style="color: #917fa5;">TrainingPeaks-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UPS.com-DarkMode.user.css" style="color: #7695b5;">UPS.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Unroll.me-DarkMode.user.css" style="color: #4dc5c0;">Unroll.me-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UptimeRobotDark.user.css" style="color: #76cd4b;">UptimeRobotDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserStyle-Root-ColorTemplate.user.css" style="color: #c588d3;">UserStyle-Root-ColorTemplate.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserscriptTemplate.user.css" style="color: #689e5d;">UserscriptTemplate.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserscriptZone-Dark.user.css" style="color: #8c9c36;">UserscriptZone-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserstyleWorld-DarkBamaBraves.user.css" style="color: #72e940;">UserstyleWorld-DarkBamaBraves.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/VisualStudioCode-DarkMode.user.css" style="color: #32eba0;">VisualStudioCode-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/WahooFitnessDarkMode.user.css" style="color: #9b84ed;">WahooFitnessDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Walmart.com-DarkMode.user.css" style="color: #a88c11;">Walmart.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wanderer-Dark.user.css" style="color: #bca630;">Wanderer-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Weather.com-DarkMode.user.css" style="color: #48a382;">Weather.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/WebHint-Dark.user.css" style="color: #9cc6ce;">WebHint-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wigle-DarkMode-Beta.user.css" style="color: #86aa56;">Wigle-DarkMode-Beta.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wigle-DarkMode.user.css" style="color: #799727;">Wigle-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wikipedia-OLED-SettingsPage.user.css" style="color: #fc9ec3;">Wikipedia-OLED-SettingsPage.user.css</a></li></ul>`;
                            break;
                        case 'file-list-5':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Windy-DarkMode.user.css" style="color: #2ac2a4;">Windy-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YT-Vibra.user.css" style="color: #749a1c;">YT-Vibra.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeRainbowProgress.user.css" style="color: #46c205;">YoutubeRainbowProgress.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeScrubberColors.user.css" style="color: #60ba2c;">YoutubeScrubberColors.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeTV-BlackMode.user.css" style="color: #d8a931;">YoutubeTV-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Zwift.com-Dark-Mode.user.css" style="color: #27bd46;">Zwift.com-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwiftHacks-DarkMode.user.css" style="color: #d8bc17;">ZwiftHacks-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwiftInsiderDarkMode.user.css" style="color: #2eba20;">ZwiftInsiderDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwiftPower.comDark%20Mode.user.css" style="color: #bc70e9;">ZwiftPower.comDark Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Zwiftalizer.com-Darker-Mode.user.css" style="color: #40c006;">Zwiftalizer.com-Darker-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwifterBikesDarkMode.user.css" style="color: #b9afa3;">ZwifterBikesDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/abcnews.go.com-DarkMode.user.css" style="color: #4fe3ca;">abcnews.go.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/bicycling-DarkMode.user.css" style="color: #5ebc50;">bicycling-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/detroitmi.gov-DarkMode.user.css" style="color: #5baf1f;">detroitmi.gov-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ebay-Dark-Mode.user.css" style="color: #55c1dc;">ebay-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/findthatride-darkmode.user.css" style="color: #969eea;">findthatride-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/fitfiletools-darkmode.user.css" style="color: #678f44;">fitfiletools-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/fivethirtyeight.comDarkMode.user.css" style="color: #688c92;">fivethirtyeight.comDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/jalopnik.com-DarkMode.user.css" style="color: #80d1d9;">jalopnik.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/kom.club-darkmode.user.css" style="color: #fdb181;">kom.club-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/makinolo.com-Dark-Mode.user.css" style="color: #67d375;">makinolo.com-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/michigan.gov-DarkMode.user.css" style="color: #64e860;">michigan.gov-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/mywindsock-darkmode.user.css" style="color: #28e53c;">mywindsock-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/nbcwashington.com-DarkMode.user.css" style="color: #d57a9c;">nbcwashington.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/nytimes.com-DarkModeSimple.user.css" style="color: #7f92cb;">nytimes.com-DarkModeSimple.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/p337info-tf2.user.css" style="color: #e4cd0b;">p337info-tf2.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/runalyze-darkmode.user.css" style="color: #d66f54;">runalyze-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/stravatoolbox-darkmode.user.css" style="color: #63bb14;">stravatoolbox-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/veloviewer-darkmode.user.css" style="color: #858e22;">veloviewer-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/zwifthub.com-darkmode.user.css" style="color: #4ca070;">zwifthub.com-darkmode.user.css</a></li>
<h2 style="color: #d5b03e;">Userscripts</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/AscentDescentMetersToFeet.user.js" style="color: #c5a1f6;">AscentDescentMetersToFeet.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/AutoMergeDependabotPRs.user.js" style="color: #5bc367;">AutoMergeDependabotPRs.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/DeleteYoutubePlaylists.user.js" style="color: #ea9094;">DeleteYoutubePlaylists.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnhanceYouTubeProfilePictures.user.js" style="color: #d76ea3;">EnhanceYouTubeProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnlargeKiwifarmsProfilePictures.user.js" style="color: #899771;">EnlargeKiwifarmsProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnlargeYouTubeChatProfilePictures.user.js" style="color: #cab476;">EnlargeYouTubeChatProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnlargeYouTubeCommentSectionProfilePictures.user.js" style="color: #369e4a;">EnlargeYouTubeCommentSectionProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GOTOESFitFileEditor-AutoClosePopup.user.js" style="color: #f7871d;">GOTOESFitFileEditor-AutoClosePopup.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminConnectRemoveGear.user.js" style="color: #e38589;">GarminConnectRemoveGear.user.js</a></li></ul>`;
                            break;
                        case 'file-list-6':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GithubMarkMergedDone.user.js" style="color: #3f9785;">GithubMarkMergedDone.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GyazoDirectLink.user.js" style="color: #2cd9f7;">GyazoDirectLink.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/HideChineseUserstyles.user.js" style="color: #6a97fd;">HideChineseUserstyles.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/HideNon-EnglishUserstyles.user.js" style="color: #4cb7c2;">HideNon-EnglishUserstyles.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/KudoAll-Strava-Garmin.user.js" style="color: #74d41f;">KudoAll-Strava-Garmin.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MergeDependabotPRs.user.js" style="color: #83cc83;">MergeDependabotPRs.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWikiAuto-Categorizer-SlowMode.user.js" style="color: #48c371;">OSRSWikiAuto-Categorizer-SlowMode.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWikiAuto-Categorizer.user.js" style="color: #769b4e;">OSRSWikiAuto-Categorizer.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWikiAuto-Navbox-SlowMode.user.js" style="color: #49ca0a;">OSRSWikiAuto-Navbox-SlowMode.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-API-Key-Version-Reddit-Only-Version.user.js" style="color: #f45fbf;">OldRedditNewProfilePictures-API-Key-Version-Reddit-Only-Version.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-API-Key-Version-Reddit-Stream-Version.user.js" style="color: #95c9ce;">OldRedditNewProfilePictures-API-Key-Version-Reddit-Stream-Version.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-API-Key-Version.user.js" style="color: #f3c636;">OldRedditNewProfilePictures-API-Key-Version.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-UniversalVersion.user.js" style="color: #57ded5;">OldRedditNewProfilePictures-UniversalVersion.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures.user.js" style="color: #c99b90;">OldRedditNewProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures/Old%20Reddit%20with%20New%20Profile%20Pictures.user.js" style="color: #fda014;">OldRedditNewProfilePictures/Old Reddit with New Profile Pictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RedditStreamAutoRefresher.user.js" style="color: #de6bd3;">RedditStreamAutoRefresher.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RedditStreamAutoRefresherFaster.user.js" style="color: #97c0c4;">RedditStreamAutoRefresherFaster.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RightClickEnable.user.js" style="color: #41f81c;">RightClickEnable.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaAutoAuthorize.user.js" style="color: #e398fd;">StravaAutoAuthorize.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaTextAuto-Selector.user.js" style="color: #5cb884;">StravaTextAuto-Selector.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SuperchargedLocalDirectoryWebUI.user.js" style="color: #8dc663;">SuperchargedLocalDirectoryWebUI.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserstyleWorld-SyncStyles.user.js" style="color: #d19488;">UserstyleWorld-SyncStyles.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTV-Volume-Rememberer.user.js" style="color: #46aeba;">YouTubeTV-Volume-Rememberer.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl.user.js" style="color: #86d561;">YouTubeTVVolumeControl.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl.user.js" style="color: #6a9b6d;">YouTubeVolumeControl.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeVolumeDisplay.user.js" style="color: #d8b2fa;">YoutubeVolumeDisplay.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Zwift-Give-RideOns-to-Everyone.user.js" style="color: #ed6c7e;">Zwift-Give-RideOns-to-Everyone.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/reddit-stream-Enhancements.user.js" style="color: #8b81cc;">reddit-stream-Enhancements.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-Add-Balance-Original.user.js" style="color: #9c77fc;">strava-balance/Strava-Add-Balance-Original.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-Add-Balance-Updated.user.js" style="color: #dc7e31;">strava-balance/Strava-Add-Balance-Updated.user.js</a></li>
<h2 style="color: #eabd95;">CSS</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Discord-Dark%2B-Default-Member-List.css" style="color: #899ddc;">Discord-Dark+-Default-Member-List.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/styles.css" style="color: #bc7a64;">YouTubeVolumeControl/styles.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.css" style="color: #f17530;">codemirror.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.min.css" style="color: #32a939;">codemirror.min.css</a></li>
<h2 style="color: #68bd19;">JavaScript</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.eslintrc.js" style="color: #cec94a;">.eslintrc.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/background.js" style="color: #89c1f0;">SteamCookieExtractor2/background.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/content.js" style="color: #daaa64;">SteamCookieExtractor2/content.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/options.js" style="color: #be8e2f;">SteamCookieExtractor2/options.js</a></li></ul>`;
                            break;
                        case 'file-list-7':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/popup.js" style="color: #7eb9e1;">SteamCookieExtractor2/popup.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/WIndyPlugin.min.js" style="color: #48c9bc;">WIndyPlugin.min.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/background.js" style="color: #6dac39;">YouTubeTVVolumeControl/background.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/content.js" style="color: #9c976e;">YouTubeTVVolumeControl/content.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/background.js" style="color: #b3d0ae;">YouTubeVolumeControl/background.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/content.js" style="color: #93aac6;">YouTubeVolumeControl/content.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify-css-mod.js" style="color: #c3980b;">beautify-css-mod.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify.js" style="color: #9883db;">beautify.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.js" style="color: #6db696;">codemirror.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.min.js" style="color: #8fd2cc;">codemirror.min.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/convertHexToRgba.js" style="color: #f977b8;">convertHexToRgba.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/css.js" style="color: #49bb6e;">css.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/css.min.js" style="color: #a1844a;">css.min.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/cyclingCalculators.js" style="color: #26c072;">cyclingCalculators.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-AddBalance-Updated.js" style="color: #81b17b;">strava-balance/Strava-AddBalance-Updated.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-AddBalance.js" style="color: #579068;">strava-balance/Strava-AddBalance.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/binary-Updated.js" style="color: #a98466;">strava-balance/binary-Updated.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/binary.js" style="color: #4f9af0;">strava-balance/binary.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/buffer-5.6.1/base64-js-1.3.1/index.js" style="color: #5eb53f;">strava-balance/buffer-5.6.1/base64-js-1.3.1/index.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/buffer-5.6.1/ieee754-1.1.13/index.js" style="color: #b0d512;">strava-balance/buffer-5.6.1/ieee754-1.1.13/index.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/buffer-5.6.1/index.js" style="color: #49e661;">strava-balance/buffer-5.6.1/index.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/fit-parser-Updated.js" style="color: #33ac8c;">strava-balance/fit-parser-Updated.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/fit-parser.js" style="color: #49d0c3;">strava-balance/fit-parser.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/fit.js" style="color: #2dc64e;">strava-balance/fit.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/messages.js" style="color: #66c2ff;">strava-balance/messages.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/strava-fit-parser.js" style="color: #72e687;">strava-balance/strava-fit-parser.js</a></li>
<h2 style="color: #8580a2;">YAML</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/dependabot.yml" style="color: #74c00a;">.github/dependabot.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/labeler.yml" style="color: #79c432;">.github/labeler.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/ActionLint.yml" style="color: #77d32e;">.github/workflows/ActionLint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/Bandit.yml" style="color: #63a2a9;">.github/workflows/Bandit.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/Snake.yml" style="color: #55dbb5;">.github/workflows/Snake.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/black-formatter.yml" style="color: #bc7d4d;">.github/workflows/black-formatter.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/codeql.yml" style="color: #67f32d;">.github/workflows/codeql.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/defender.yml" style="color: #728b9f;">.github/workflows/defender.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/deno.yml" style="color: #78c1a1;">.github/workflows/deno.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/dependency-review.yml" style="color: #33efdd;">.github/workflows/dependency-review.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/devskim.yml" style="color: #d3cb62;">.github/workflows/devskim.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/eslint.yml" style="color: #818dac;">.github/workflows/eslint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/generate-file-list.yml" style="color: #60a760;">.github/workflows/generate-file-list.yml</a></li></ul>`;
                            break;
                        case 'file-list-8':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/greetings.yml" style="color: #72a2b3;">.github/workflows/greetings.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/label.yml" style="color: #e9c102;">.github/workflows/label.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/ossar.yml" style="color: #63c417;">.github/workflows/ossar.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/osv-scanner.yml" style="color: #3390cd;">.github/workflows/osv-scanner.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/scorecards.yml" style="color: #ac78e5;">.github/workflows/scorecards.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/semgrep.yml" style="color: #c3c505;">.github/workflows/semgrep.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/sitemap.yml" style="color: #4cd19a;">.github/workflows/sitemap.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/sobelow.yml" style="color: #979aee;">.github/workflows/sobelow.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/stale.yml" style="color: #f479e1;">.github/workflows/stale.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/static.yml" style="color: #81b73a;">.github/workflows/static.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/stylelint.yml" style="color: #8291ed;">.github/workflows/stylelint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/super-linter.yml" style="color: #61b79e;">.github/workflows/super-linter.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.markdownlint.yml" style="color: #2c9e54;">.markdownlint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.scss-lint.yml" style="color: #cda7ae;">.scss-lint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/_config.yml" style="color: #a1aa19;">_config.yml</a></li>
<h2 style="color: #3edbd2;">.github/PULL_REQUEST_TEMPLATE</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/PULL_REQUEST_TEMPLATE/pull_request_template.md" style="color: #f0aef4;">.github/PULL_REQUEST_TEMPLATE/pull_request_template.md</a></li>
<h2 style="color: #8095d8;">.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/bug_report.md" style="color: #db6a67;">.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/bug_report.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/feature_request.md" style="color: #b18272;">.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/feature_request.md</a></li>
<h2 style="color: #72d612;">.vscode</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/generate_file_list.py" style="color: #bcb6ee;">.vscode/generate_file_list.py</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/launch.json" style="color: #d1c09e;">.vscode/launch.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/settings.json" style="color: #6e89b4;">.vscode/settings.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/tasks.json" style="color: #68c9cc;">.vscode/tasks.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/test_generate_file_list.py" style="color: #37a0b1;">.vscode/test_generate_file_list.py</a></li>
<h2 style="color: #4db7d7;">OldRedditNewProfilePictures</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures/Old%20Reddit%20with%20New%20Profile%20Pictures.options.json" style="color: #7b946d;">OldRedditNewProfilePictures/Old Reddit with New Profile Pictures.options.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures/Old%20Reddit%20with%20New%20Profile%20Pictures.storage.json" style="color: #d18f94;">OldRedditNewProfilePictures/Old Reddit with New Profile Pictures.storage.json</a></li>
<h2 style="color: #69e20f;">SteamCookieExtractor2</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/manifest.json" style="color: #a2b72f;">SteamCookieExtractor2/manifest.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/options.html" style="color: #80d39c;">SteamCookieExtractor2/options.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/popup.html" style="color: #c596b6;">SteamCookieExtractor2/popup.html</a></li>
<h2 style="color: #e1a34b;">SteamCookieExtractor2/icons</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/icon128.png" style="color: #a67b46;">SteamCookieExtractor2/icons/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/icon16.png" style="color: #48f463;">SteamCookieExtractor2/icons/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/icon48.png" style="color: #49e063;">SteamCookieExtractor2/icons/icon48.png</a></li>
<h2 style="color: #ab9130;">SteamCookieExtractor2/icons/images</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/images/icon128.png" style="color: #31e0b8;">SteamCookieExtractor2/icons/images/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/images/icon16.png" style="color: #95cf8b;">SteamCookieExtractor2/icons/images/icon16.png</a></li></ul>`;
                            break;
                        case 'file-list-9':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/images/icon48.png" style="color: #c6cca3;">SteamCookieExtractor2/icons/images/icon48.png</a></li>
<h2 style="color: #cd943e;">YouTubeTVVolumeControl</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/icon128.png" style="color: #26b149;">YouTubeTVVolumeControl/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/icon16.png" style="color: #598db0;">YouTubeTVVolumeControl/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/icon48.png" style="color: #46c0db;">YouTubeTVVolumeControl/icon48.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/manifest.json" style="color: #e0c60b;">YouTubeTVVolumeControl/manifest.json</a></li>
<h2 style="color: #b09d0f;">YouTubeVolumeControl</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icon128.png" style="color: #3ac5f1;">YouTubeVolumeControl/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icon16.png" style="color: #59c5ee;">YouTubeVolumeControl/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icon48.png" style="color: #98a5ab;">YouTubeVolumeControl/icon48.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/manifest.json" style="color: #b9d204;">YouTubeVolumeControl/manifest.json</a></li>
<h2 style="color: #74a9f1;">YouTubeVolumeControl/icons</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/icon128.png" style="color: #6abcdb;">YouTubeVolumeControl/icons/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/icon16.png" style="color: #36ee2e;">YouTubeVolumeControl/icons/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/icon48.png" style="color: #f783e3;">YouTubeVolumeControl/icons/icon48.png</a></li>
<h2 style="color: #c0a96a;">YouTubeVolumeControl/icons/images</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/images/icon128.png" style="color: #f29261;">YouTubeVolumeControl/icons/images/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/images/icon16.png" style="color: #cbbfad;">YouTubeVolumeControl/icons/images/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/images/icon48.png" style="color: #6cc6cc;">YouTubeVolumeControl/icons/images/icon48.png</a></li>
<h2 style="color: #c7a2d9;">assets</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-city-background.png" style="color: #90bc82;">assets/kiwi-city-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-default-background.png" style="color: #22e49e;">assets/kiwi-default-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-flower-background.png" style="color: #5fd227;">assets/kiwi-flower-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-green-background.png" style="color: #f19639;">assets/kiwi-green-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-purple-background.png" style="color: #ddb1da;">assets/kiwi-purple-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-space-apple-background.png" style="color: #76a9f3;">assets/kiwi-space-apple-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-swirls-background.png" style="color: #53bc8e;">assets/kiwi-swirls-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-trees-background.png" style="color: #67da9e;">assets/kiwi-trees-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-vaporwave-logo.png" style="color: #2bc5a6;">assets/kiwi-vaporwave-logo.png</a></li>
<h2 style="color: #5c80ec;">src</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/src/generate_file_list.py" style="color: #48b995;">src/generate_file_list.py</a></li></ul>`;
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
                    file_list_html = `<ul><h2 style="color: #448be3;">Repo Root</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.black" style="color: #d178bb;">.black</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.copilot-instructions.md" style="color: #f9618f;">.copilot-instructions.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.editorconfig" style="color: #5ccdd3;">.editorconfig</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.gitignore" style="color: #b5c4ac;">.gitignore</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.gitleaksignore" style="color: #d08d3d;">.gitleaksignore</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.hintrc" style="color: #f4ace9;">.hintrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.jsbeautifyrc" style="color: #9eba45;">.jsbeautifyrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.jscsrc" style="color: #68bc1c;">.jscsrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.npmrc" style="color: #be9f1d;">.npmrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.pre-commit-config.yaml" style="color: #d9acc8;">.pre-commit-config.yaml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.pre-commit-hooks.yaml" style="color: #48ae5c;">.pre-commit-hooks.yaml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierignore" style="color: #e5b1a2;">.prettierignore</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierrc" style="color: #22c666;">.prettierrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierrc.noplugins" style="color: #67c9ea;">.prettierrc.noplugins</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierrc.temp" style="color: #efa1bb;">.prettierrc.temp</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.stylelintrc.json" style="color: #888ff6;">.stylelintrc.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vale.ini" style="color: #b6c48a;">.vale.ini</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CNAME" style="color: #fcb18b;">CNAME</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CODE_OF_CONDUCT.md" style="color: #c096f5;">CODE_OF_CONDUCT.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CONTRIBUTING.md" style="color: #25f74b;">CONTRIBUTING.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Gemfile" style="color: #9a8132;">Gemfile</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Gemfile.lock" style="color: #c6a9eb;">Gemfile.lock</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/KudoAll-Strava-Garmin.user.test.cjs" style="color: #48c21b;">KudoAll-Strava-Garmin.user.test.cjs</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/LICENSE" style="color: #ed9116;">LICENSE</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Microsoft.PowerShell_profile.Tests.ps1" style="color: #3ae599;">Microsoft.PowerShell_profile.Tests.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Microsoft.PowerShell_profile.ps1" style="color: #38a4d9;">Microsoft.PowerShell_profile.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Microsoft.VSCode_profile.ps1" style="color: #2aec94;">Microsoft.VSCode_profile.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures.html" style="color: #dab179;">OldRedditNewProfilePictures.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PrettierFormatExcludePreprocessor.ps1" style="color: #caa243;">PrettierFormatExcludePreprocessor.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Profile.ps1" style="color: #ad9c7d;">Profile.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/README.md" style="color: #4dabf3;">README.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SECURITY.md" style="color: #2afd21;">SECURITY.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify-local.html" style="color: #dd811f;">beautify-local.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify.html" style="color: #4dd622;">beautify.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/convertHexToRgba.html" style="color: #65c193;">convertHexToRgba.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/cyclingCalculators.html" style="color: #98cd60;">cyclingCalculators.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/deno.json" style="color: #51e326;">deno.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/deno.lock" style="color: #e76e86;">deno.lock</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/eslint.config.mjs" style="color: #8abb1c;">eslint.config.mjs</a></li></ul>`;
                    break;
                case 'file-list-2':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/favicon.ico" style="color: #7dacdb;">favicon.ico</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/favicon.png" style="color: #c1c9ce;">favicon.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/file_list.html" style="color: #c0883a;">file_list.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/file_list.md" style="color: #cfa77b;">file_list.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/generate_gemfile.rb" style="color: #cf85f7;">generate_gemfile.rb</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/jsconfig.json" style="color: #56d98f;">jsconfig.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/package-lock.json" style="color: #379c56;">package-lock.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/package.json" style="color: #2fa1e8;">package.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/requirements.txt" style="color: #b0af7a;">requirements.txt</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/robots.txt" style="color: #a9df35;">robots.txt</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/sitemap.xml" style="color: #bdb443;">sitemap.xml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/useragent-switcher-preferences.json" style="color: #bc6bf9;">useragent-switcher-preferences.json</a></li>
<h2 style="color: #60e44d;">Userstyles</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/17track.net-DarkMode.user.css" style="color: #2bdc12;">17track.net-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ActivityFixDarkMode.user.css" style="color: #7c9a8a;">ActivityFixDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Archive.orgNightTheme%28Updated%29.user.css" style="color: #a39e89;">Archive.orgNightTheme(Updated).user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Benjdd-dark.user.css" style="color: #aea9cb;">Benjdd-dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CFG.tf-DarkMode.user.css" style="color: #71da2f;">CFG.tf-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CSSGradient-DarkMode.user.css" style="color: #23a919;">CSSGradient-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CSSPortal-Dark.user.css" style="color: #c5a640;">CSSPortal-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Copilot-Microsoft-Blackmode.user.css" style="color: #6abc51;">Copilot-Microsoft-Blackmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CrystalMathLabs-BlackMode.user.css" style="color: #bcd05e;">CrystalMathLabs-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/DCRainMaker-DarkMode.user.css" style="color: #6da203;">DCRainMaker-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Dearrow-RemoveDearrowButton.user.css" style="color: #a989ac;">Dearrow-RemoveDearrowButton.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/DeepSeek-DarkMode.user.css" style="color: #4fa268;">DeepSeek-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ESPN-DarkMode.user.css" style="color: #ef83bf;">ESPN-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/FandomDark.user.css" style="color: #698c92;">FandomDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Favero-DarkMode.user.css" style="color: #e566cd;">Favero-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Fedex.com-DarkMode.user.css" style="color: #47bdbc;">Fedex.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/FitFileViewer-DarkTheme.user.css" style="color: #52db66;">FitFileViewer-DarkTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/FiveServer-DarkMode.user.css" style="color: #44b60c;">FiveServer-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GOTOES.org-DarkMode.user.css" style="color: #2de79d;">GOTOES.org-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GTBikeV-DarkMode.user.css" style="color: #d08801;">GTBikeV-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminBadges-DarkMode.user.css" style="color: #91de05;">GarminBadges-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminConnectDark.user.css" style="color: #24f14d;">GarminConnectDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminRumors-DarkMode.user.css" style="color: #85d7dc;">GarminRumors-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GreasyForkDark.user.css" style="color: #61eb7f;">GreasyForkDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Gyazo-DarkMode.user.css" style="color: #7fa3cc;">Gyazo-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Kiwifarms-Black.user.css" style="color: #23c2dc;">Kiwifarms-Black.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Kiwifarms-Halloween.user.css" style="color: #cc8794;">Kiwifarms-Halloween.user.css</a></li></ul>`;
                    break;
                case 'file-list-3':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Kiwifarms-Vaporwave.user.css" style="color: #34ec84;">Kiwifarms-Vaporwave.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Klimat.app-DarkMode.user.css" style="color: #f36e12;">Klimat.app-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MarkdownViewer%2B%2BTheme.user.css" style="color: #bf934b;">MarkdownViewer++Theme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Medicare-Gov-Dark-Mode.user.css" style="color: #c6cc0f;">Medicare-Gov-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MyBikeTraffic-DarkMode.user.css" style="color: #bcc0fa;">MyBikeTraffic-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MyWorkoutCompanion-Dark.user.css" style="color: #48bd9e;">MyWorkoutCompanion-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Nascar.com-DarkMode.user.css" style="color: #3ec4d4;">Nascar.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/NewYorkerDarkMode.user.css" style="color: #41cd03;">NewYorkerDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/NewYorkerSimpleDarkMode.user.css" style="color: #e78d4b;">NewYorkerSimpleDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRS-HiScores-BlackMode.user.css" style="color: #d77c8d;">OSRS-HiScores-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWorldHeatmap-Dark.user.css" style="color: #2ba430;">OSRSWorldHeatmap-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OsrsWikiDarkMode.user.css" style="color: #db7709;">OsrsWikiDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Papertrails-DarkMode.user.css" style="color: #d97693;">Papertrails-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PathFinderW3School-Dark.user.css" style="color: #f9aaf2;">PathFinderW3School-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PowerMeter.cc-DarkMode.user.css" style="color: #8fb08f;">PowerMeter.cc-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PromptHero-Dark.user.css" style="color: #50e71b;">PromptHero-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RedditColoredComments.user.css" style="color: #8db747;">RedditColoredComments.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Scrap.tf-BlackTheme.user.css" style="color: #c27e8a;">Scrap.tf-BlackTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Skial-CustomTheme.user.css" style="color: #25abd4;">Skial-CustomTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SportSurge-BlackMode.user.css" style="color: #d8a5f7;">SportSurge-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SquadRats-Dark.user.css" style="color: #8ad31f;">SquadRats-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Statshunters-Dark.user.css" style="color: #4deba3;">Statshunters-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamDB-Black-Mode.user.css" style="color: #95cf49;">SteamDB-Black-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamDB-Dark-Mode.user.css" style="color: #31e807;">SteamDB-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Brawlhalla.user.css" style="color: #7896a2;">SteamStat.us-Re-Remastered-Brawlhalla.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Christmas-Style.user.css" style="color: #78bb11;">SteamStat.us-Re-Remastered-Christmas-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Detroit-Lions-Style.user.css" style="color: #edb2d7;">SteamStat.us-Re-Remastered-Detroit-Lions-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Detroit-Tigers.user.css" style="color: #26d8de;">SteamStat.us-Re-Remastered-Detroit-Tigers.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Easter-Style.user.css" style="color: #c9d510;">SteamStat.us-Re-Remastered-Easter-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Green-BlackStyle.user.css" style="color: #77b43f;">SteamStat.us-Re-Remastered-Green-BlackStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Halloween-Style.user.css" style="color: #db6c54;">SteamStat.us-Re-Remastered-Halloween-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Lime%20Green-Purple%20Style.user.css" style="color: #a6aa61;">SteamStat.us-Re-Remastered-Lime Green-Purple Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Miami-Heat.user.css" style="color: #fe5c7f;">SteamStat.us-Re-Remastered-Miami-Heat.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-NASCAR.user.css" style="color: #60a8c5;">SteamStat.us-Re-Remastered-NASCAR.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Orange-BlackStyle.user.css" style="color: #bccea8;">SteamStat.us-Re-Remastered-Orange-BlackStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-PCMasterRace.user.css" style="color: #d9afe9;">SteamStat.us-Re-Remastered-PCMasterRace.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Pink-BlackStyle.user.css" style="color: #9a7fda;">SteamStat.us-Re-Remastered-Pink-BlackStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Purple.user.css" style="color: #daa64f;">SteamStat.us-Re-Remastered-Purple.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-RainbowStyle.user.css" style="color: #b1c62e;">SteamStat.us-Re-Remastered-RainbowStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-SteamStyle.user.css" style="color: #5de18b;">SteamStat.us-Re-Remastered-SteamStyle.user.css</a></li></ul>`;
                    break;
                case 'file-list-4':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Sunset-Style.user.css" style="color: #759b64;">SteamStat.us-Re-Remastered-Sunset-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-TeamFortress2.user.css" style="color: #2ee16d;">SteamStat.us-Re-Remastered-TeamFortress2.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-The-Crew-Motorfest.user.css" style="color: #61de6e;">SteamStat.us-Re-Remastered-The-Crew-Motorfest.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-TourDeFrance.user.css" style="color: #f9afd4;">SteamStat.us-Re-Remastered-TourDeFrance.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-USA-Style.user.css" style="color: #3ff342;">SteamStat.us-Re-Remastered-USA-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Windows95.user.css" style="color: #e4c61f;">SteamStat.us-Re-Remastered-Windows95.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Witcher3.user.css" style="color: #2bde2b;">SteamStat.us-Re-Remastered-Witcher3.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Wolverines-Style.user.css" style="color: #599c39;">SteamStat.us-Re-Remastered-Wolverines-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-WorldOfWarcraft.user.css" style="color: #5fd41b;">SteamStat.us-Re-Remastered-WorldOfWarcraft.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Zwift.user.css" style="color: #98b46b;">SteamStat.us-Re-Remastered-Zwift.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered.user.css" style="color: #a3cdd9;">SteamStat.us-Re-Remastered.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamTradeMatcher-DarkMode.user.css" style="color: #ee851a;">SteamTradeMatcher-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StepSecurityDarkMode.user.css" style="color: #fca064;">StepSecurityDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaAutoDarkTheme.user.css" style="color: #75ab97;">StravaAutoDarkTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaStratTracker-DarkMode.user.css" style="color: #f188ea;">StravaStratTracker-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StreamingSitesStreamsBlackDarkMode.user.css" style="color: #868e43;">StreamingSitesStreamsBlackDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Stylus-DarkTheme-Updated.user.css" style="color: #92b519;">Stylus-DarkTheme-Updated.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StylusEditorChromeDark-Fixed.user.css" style="color: #5bb921;">StylusEditorChromeDark-Fixed.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StylusFluent-Updated.user.css" style="color: #f48f3d;">StylusFluent-Updated.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TamperMonkey-DarkGreen.user.css" style="color: #97c8dc;">TamperMonkey-DarkGreen.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TamperMonkey-DarkMode.user.css" style="color: #2abf25;">TamperMonkey-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TeamFortressWIki-Dark.user.css" style="color: #8dd886;">TeamFortressWIki-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TechPowerUp-DarkMode.user.css" style="color: #6490d6;">TechPowerUp-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TrainingPeaks-DarkMode.user.css" style="color: #917fa5;">TrainingPeaks-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UPS.com-DarkMode.user.css" style="color: #7695b5;">UPS.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Unroll.me-DarkMode.user.css" style="color: #4dc5c0;">Unroll.me-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UptimeRobotDark.user.css" style="color: #76cd4b;">UptimeRobotDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserStyle-Root-ColorTemplate.user.css" style="color: #c588d3;">UserStyle-Root-ColorTemplate.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserscriptTemplate.user.css" style="color: #689e5d;">UserscriptTemplate.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserscriptZone-Dark.user.css" style="color: #8c9c36;">UserscriptZone-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserstyleWorld-DarkBamaBraves.user.css" style="color: #72e940;">UserstyleWorld-DarkBamaBraves.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/VisualStudioCode-DarkMode.user.css" style="color: #32eba0;">VisualStudioCode-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/WahooFitnessDarkMode.user.css" style="color: #9b84ed;">WahooFitnessDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Walmart.com-DarkMode.user.css" style="color: #a88c11;">Walmart.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wanderer-Dark.user.css" style="color: #bca630;">Wanderer-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Weather.com-DarkMode.user.css" style="color: #48a382;">Weather.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/WebHint-Dark.user.css" style="color: #9cc6ce;">WebHint-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wigle-DarkMode-Beta.user.css" style="color: #86aa56;">Wigle-DarkMode-Beta.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wigle-DarkMode.user.css" style="color: #799727;">Wigle-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wikipedia-OLED-SettingsPage.user.css" style="color: #fc9ec3;">Wikipedia-OLED-SettingsPage.user.css</a></li></ul>`;
                    break;
                case 'file-list-5':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Windy-DarkMode.user.css" style="color: #2ac2a4;">Windy-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YT-Vibra.user.css" style="color: #749a1c;">YT-Vibra.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeRainbowProgress.user.css" style="color: #46c205;">YoutubeRainbowProgress.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeScrubberColors.user.css" style="color: #60ba2c;">YoutubeScrubberColors.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeTV-BlackMode.user.css" style="color: #d8a931;">YoutubeTV-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Zwift.com-Dark-Mode.user.css" style="color: #27bd46;">Zwift.com-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwiftHacks-DarkMode.user.css" style="color: #d8bc17;">ZwiftHacks-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwiftInsiderDarkMode.user.css" style="color: #2eba20;">ZwiftInsiderDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwiftPower.comDark%20Mode.user.css" style="color: #bc70e9;">ZwiftPower.comDark Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Zwiftalizer.com-Darker-Mode.user.css" style="color: #40c006;">Zwiftalizer.com-Darker-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwifterBikesDarkMode.user.css" style="color: #b9afa3;">ZwifterBikesDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/abcnews.go.com-DarkMode.user.css" style="color: #4fe3ca;">abcnews.go.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/bicycling-DarkMode.user.css" style="color: #5ebc50;">bicycling-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/detroitmi.gov-DarkMode.user.css" style="color: #5baf1f;">detroitmi.gov-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ebay-Dark-Mode.user.css" style="color: #55c1dc;">ebay-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/findthatride-darkmode.user.css" style="color: #969eea;">findthatride-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/fitfiletools-darkmode.user.css" style="color: #678f44;">fitfiletools-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/fivethirtyeight.comDarkMode.user.css" style="color: #688c92;">fivethirtyeight.comDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/jalopnik.com-DarkMode.user.css" style="color: #80d1d9;">jalopnik.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/kom.club-darkmode.user.css" style="color: #fdb181;">kom.club-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/makinolo.com-Dark-Mode.user.css" style="color: #67d375;">makinolo.com-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/michigan.gov-DarkMode.user.css" style="color: #64e860;">michigan.gov-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/mywindsock-darkmode.user.css" style="color: #28e53c;">mywindsock-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/nbcwashington.com-DarkMode.user.css" style="color: #d57a9c;">nbcwashington.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/nytimes.com-DarkModeSimple.user.css" style="color: #7f92cb;">nytimes.com-DarkModeSimple.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/p337info-tf2.user.css" style="color: #e4cd0b;">p337info-tf2.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/runalyze-darkmode.user.css" style="color: #d66f54;">runalyze-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/stravatoolbox-darkmode.user.css" style="color: #63bb14;">stravatoolbox-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/veloviewer-darkmode.user.css" style="color: #858e22;">veloviewer-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/zwifthub.com-darkmode.user.css" style="color: #4ca070;">zwifthub.com-darkmode.user.css</a></li>
<h2 style="color: #d5b03e;">Userscripts</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/AscentDescentMetersToFeet.user.js" style="color: #c5a1f6;">AscentDescentMetersToFeet.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/AutoMergeDependabotPRs.user.js" style="color: #5bc367;">AutoMergeDependabotPRs.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/DeleteYoutubePlaylists.user.js" style="color: #ea9094;">DeleteYoutubePlaylists.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnhanceYouTubeProfilePictures.user.js" style="color: #d76ea3;">EnhanceYouTubeProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnlargeKiwifarmsProfilePictures.user.js" style="color: #899771;">EnlargeKiwifarmsProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnlargeYouTubeChatProfilePictures.user.js" style="color: #cab476;">EnlargeYouTubeChatProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnlargeYouTubeCommentSectionProfilePictures.user.js" style="color: #369e4a;">EnlargeYouTubeCommentSectionProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GOTOESFitFileEditor-AutoClosePopup.user.js" style="color: #f7871d;">GOTOESFitFileEditor-AutoClosePopup.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminConnectRemoveGear.user.js" style="color: #e38589;">GarminConnectRemoveGear.user.js</a></li></ul>`;
                    break;
                case 'file-list-6':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GithubMarkMergedDone.user.js" style="color: #3f9785;">GithubMarkMergedDone.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GyazoDirectLink.user.js" style="color: #2cd9f7;">GyazoDirectLink.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/HideChineseUserstyles.user.js" style="color: #6a97fd;">HideChineseUserstyles.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/HideNon-EnglishUserstyles.user.js" style="color: #4cb7c2;">HideNon-EnglishUserstyles.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/KudoAll-Strava-Garmin.user.js" style="color: #74d41f;">KudoAll-Strava-Garmin.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MergeDependabotPRs.user.js" style="color: #83cc83;">MergeDependabotPRs.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWikiAuto-Categorizer-SlowMode.user.js" style="color: #48c371;">OSRSWikiAuto-Categorizer-SlowMode.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWikiAuto-Categorizer.user.js" style="color: #769b4e;">OSRSWikiAuto-Categorizer.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWikiAuto-Navbox-SlowMode.user.js" style="color: #49ca0a;">OSRSWikiAuto-Navbox-SlowMode.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-API-Key-Version-Reddit-Only-Version.user.js" style="color: #f45fbf;">OldRedditNewProfilePictures-API-Key-Version-Reddit-Only-Version.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-API-Key-Version-Reddit-Stream-Version.user.js" style="color: #95c9ce;">OldRedditNewProfilePictures-API-Key-Version-Reddit-Stream-Version.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-API-Key-Version.user.js" style="color: #f3c636;">OldRedditNewProfilePictures-API-Key-Version.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-UniversalVersion.user.js" style="color: #57ded5;">OldRedditNewProfilePictures-UniversalVersion.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures.user.js" style="color: #c99b90;">OldRedditNewProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures/Old%20Reddit%20with%20New%20Profile%20Pictures.user.js" style="color: #fda014;">OldRedditNewProfilePictures/Old Reddit with New Profile Pictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RedditStreamAutoRefresher.user.js" style="color: #de6bd3;">RedditStreamAutoRefresher.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RedditStreamAutoRefresherFaster.user.js" style="color: #97c0c4;">RedditStreamAutoRefresherFaster.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RightClickEnable.user.js" style="color: #41f81c;">RightClickEnable.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaAutoAuthorize.user.js" style="color: #e398fd;">StravaAutoAuthorize.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaTextAuto-Selector.user.js" style="color: #5cb884;">StravaTextAuto-Selector.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SuperchargedLocalDirectoryWebUI.user.js" style="color: #8dc663;">SuperchargedLocalDirectoryWebUI.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserstyleWorld-SyncStyles.user.js" style="color: #d19488;">UserstyleWorld-SyncStyles.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTV-Volume-Rememberer.user.js" style="color: #46aeba;">YouTubeTV-Volume-Rememberer.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl.user.js" style="color: #86d561;">YouTubeTVVolumeControl.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl.user.js" style="color: #6a9b6d;">YouTubeVolumeControl.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeVolumeDisplay.user.js" style="color: #d8b2fa;">YoutubeVolumeDisplay.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Zwift-Give-RideOns-to-Everyone.user.js" style="color: #ed6c7e;">Zwift-Give-RideOns-to-Everyone.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/reddit-stream-Enhancements.user.js" style="color: #8b81cc;">reddit-stream-Enhancements.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-Add-Balance-Original.user.js" style="color: #9c77fc;">strava-balance/Strava-Add-Balance-Original.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-Add-Balance-Updated.user.js" style="color: #dc7e31;">strava-balance/Strava-Add-Balance-Updated.user.js</a></li>
<h2 style="color: #eabd95;">CSS</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Discord-Dark%2B-Default-Member-List.css" style="color: #899ddc;">Discord-Dark+-Default-Member-List.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/styles.css" style="color: #bc7a64;">YouTubeVolumeControl/styles.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.css" style="color: #f17530;">codemirror.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.min.css" style="color: #32a939;">codemirror.min.css</a></li>
<h2 style="color: #68bd19;">JavaScript</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.eslintrc.js" style="color: #cec94a;">.eslintrc.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/background.js" style="color: #89c1f0;">SteamCookieExtractor2/background.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/content.js" style="color: #daaa64;">SteamCookieExtractor2/content.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/options.js" style="color: #be8e2f;">SteamCookieExtractor2/options.js</a></li></ul>`;
                    break;
                case 'file-list-7':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/popup.js" style="color: #7eb9e1;">SteamCookieExtractor2/popup.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/WIndyPlugin.min.js" style="color: #48c9bc;">WIndyPlugin.min.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/background.js" style="color: #6dac39;">YouTubeTVVolumeControl/background.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/content.js" style="color: #9c976e;">YouTubeTVVolumeControl/content.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/background.js" style="color: #b3d0ae;">YouTubeVolumeControl/background.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/content.js" style="color: #93aac6;">YouTubeVolumeControl/content.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify-css-mod.js" style="color: #c3980b;">beautify-css-mod.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify.js" style="color: #9883db;">beautify.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.js" style="color: #6db696;">codemirror.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.min.js" style="color: #8fd2cc;">codemirror.min.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/convertHexToRgba.js" style="color: #f977b8;">convertHexToRgba.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/css.js" style="color: #49bb6e;">css.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/css.min.js" style="color: #a1844a;">css.min.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/cyclingCalculators.js" style="color: #26c072;">cyclingCalculators.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-AddBalance-Updated.js" style="color: #81b17b;">strava-balance/Strava-AddBalance-Updated.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-AddBalance.js" style="color: #579068;">strava-balance/Strava-AddBalance.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/binary-Updated.js" style="color: #a98466;">strava-balance/binary-Updated.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/binary.js" style="color: #4f9af0;">strava-balance/binary.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/buffer-5.6.1/base64-js-1.3.1/index.js" style="color: #5eb53f;">strava-balance/buffer-5.6.1/base64-js-1.3.1/index.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/buffer-5.6.1/ieee754-1.1.13/index.js" style="color: #b0d512;">strava-balance/buffer-5.6.1/ieee754-1.1.13/index.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/buffer-5.6.1/index.js" style="color: #49e661;">strava-balance/buffer-5.6.1/index.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/fit-parser-Updated.js" style="color: #33ac8c;">strava-balance/fit-parser-Updated.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/fit-parser.js" style="color: #49d0c3;">strava-balance/fit-parser.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/fit.js" style="color: #2dc64e;">strava-balance/fit.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/messages.js" style="color: #66c2ff;">strava-balance/messages.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/strava-fit-parser.js" style="color: #72e687;">strava-balance/strava-fit-parser.js</a></li>
<h2 style="color: #8580a2;">YAML</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/dependabot.yml" style="color: #74c00a;">.github/dependabot.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/labeler.yml" style="color: #79c432;">.github/labeler.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/ActionLint.yml" style="color: #77d32e;">.github/workflows/ActionLint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/Bandit.yml" style="color: #63a2a9;">.github/workflows/Bandit.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/Snake.yml" style="color: #55dbb5;">.github/workflows/Snake.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/black-formatter.yml" style="color: #bc7d4d;">.github/workflows/black-formatter.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/codeql.yml" style="color: #67f32d;">.github/workflows/codeql.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/defender.yml" style="color: #728b9f;">.github/workflows/defender.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/deno.yml" style="color: #78c1a1;">.github/workflows/deno.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/dependency-review.yml" style="color: #33efdd;">.github/workflows/dependency-review.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/devskim.yml" style="color: #d3cb62;">.github/workflows/devskim.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/eslint.yml" style="color: #818dac;">.github/workflows/eslint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/generate-file-list.yml" style="color: #60a760;">.github/workflows/generate-file-list.yml</a></li></ul>`;
                    break;
                case 'file-list-8':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/greetings.yml" style="color: #72a2b3;">.github/workflows/greetings.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/label.yml" style="color: #e9c102;">.github/workflows/label.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/ossar.yml" style="color: #63c417;">.github/workflows/ossar.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/osv-scanner.yml" style="color: #3390cd;">.github/workflows/osv-scanner.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/scorecards.yml" style="color: #ac78e5;">.github/workflows/scorecards.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/semgrep.yml" style="color: #c3c505;">.github/workflows/semgrep.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/sitemap.yml" style="color: #4cd19a;">.github/workflows/sitemap.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/sobelow.yml" style="color: #979aee;">.github/workflows/sobelow.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/stale.yml" style="color: #f479e1;">.github/workflows/stale.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/static.yml" style="color: #81b73a;">.github/workflows/static.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/stylelint.yml" style="color: #8291ed;">.github/workflows/stylelint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/super-linter.yml" style="color: #61b79e;">.github/workflows/super-linter.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.markdownlint.yml" style="color: #2c9e54;">.markdownlint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.scss-lint.yml" style="color: #cda7ae;">.scss-lint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/_config.yml" style="color: #a1aa19;">_config.yml</a></li>
<h2 style="color: #3edbd2;">.github/PULL_REQUEST_TEMPLATE</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/PULL_REQUEST_TEMPLATE/pull_request_template.md" style="color: #f0aef4;">.github/PULL_REQUEST_TEMPLATE/pull_request_template.md</a></li>
<h2 style="color: #8095d8;">.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/bug_report.md" style="color: #db6a67;">.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/bug_report.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/feature_request.md" style="color: #b18272;">.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/feature_request.md</a></li>
<h2 style="color: #72d612;">.vscode</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/generate_file_list.py" style="color: #bcb6ee;">.vscode/generate_file_list.py</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/launch.json" style="color: #d1c09e;">.vscode/launch.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/settings.json" style="color: #6e89b4;">.vscode/settings.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/tasks.json" style="color: #68c9cc;">.vscode/tasks.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/test_generate_file_list.py" style="color: #37a0b1;">.vscode/test_generate_file_list.py</a></li>
<h2 style="color: #4db7d7;">OldRedditNewProfilePictures</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures/Old%20Reddit%20with%20New%20Profile%20Pictures.options.json" style="color: #7b946d;">OldRedditNewProfilePictures/Old Reddit with New Profile Pictures.options.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures/Old%20Reddit%20with%20New%20Profile%20Pictures.storage.json" style="color: #d18f94;">OldRedditNewProfilePictures/Old Reddit with New Profile Pictures.storage.json</a></li>
<h2 style="color: #69e20f;">SteamCookieExtractor2</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/manifest.json" style="color: #a2b72f;">SteamCookieExtractor2/manifest.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/options.html" style="color: #80d39c;">SteamCookieExtractor2/options.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/popup.html" style="color: #c596b6;">SteamCookieExtractor2/popup.html</a></li>
<h2 style="color: #e1a34b;">SteamCookieExtractor2/icons</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/icon128.png" style="color: #a67b46;">SteamCookieExtractor2/icons/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/icon16.png" style="color: #48f463;">SteamCookieExtractor2/icons/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/icon48.png" style="color: #49e063;">SteamCookieExtractor2/icons/icon48.png</a></li>
<h2 style="color: #ab9130;">SteamCookieExtractor2/icons/images</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/images/icon128.png" style="color: #31e0b8;">SteamCookieExtractor2/icons/images/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/images/icon16.png" style="color: #95cf8b;">SteamCookieExtractor2/icons/images/icon16.png</a></li></ul>`;
                    break;
                case 'file-list-9':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/images/icon48.png" style="color: #c6cca3;">SteamCookieExtractor2/icons/images/icon48.png</a></li>
<h2 style="color: #cd943e;">YouTubeTVVolumeControl</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/icon128.png" style="color: #26b149;">YouTubeTVVolumeControl/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/icon16.png" style="color: #598db0;">YouTubeTVVolumeControl/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/icon48.png" style="color: #46c0db;">YouTubeTVVolumeControl/icon48.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/manifest.json" style="color: #e0c60b;">YouTubeTVVolumeControl/manifest.json</a></li>
<h2 style="color: #b09d0f;">YouTubeVolumeControl</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icon128.png" style="color: #3ac5f1;">YouTubeVolumeControl/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icon16.png" style="color: #59c5ee;">YouTubeVolumeControl/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icon48.png" style="color: #98a5ab;">YouTubeVolumeControl/icon48.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/manifest.json" style="color: #b9d204;">YouTubeVolumeControl/manifest.json</a></li>
<h2 style="color: #74a9f1;">YouTubeVolumeControl/icons</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/icon128.png" style="color: #6abcdb;">YouTubeVolumeControl/icons/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/icon16.png" style="color: #36ee2e;">YouTubeVolumeControl/icons/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/icon48.png" style="color: #f783e3;">YouTubeVolumeControl/icons/icon48.png</a></li>
<h2 style="color: #c0a96a;">YouTubeVolumeControl/icons/images</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/images/icon128.png" style="color: #f29261;">YouTubeVolumeControl/icons/images/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/images/icon16.png" style="color: #cbbfad;">YouTubeVolumeControl/icons/images/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/images/icon48.png" style="color: #6cc6cc;">YouTubeVolumeControl/icons/images/icon48.png</a></li>
<h2 style="color: #c7a2d9;">assets</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-city-background.png" style="color: #90bc82;">assets/kiwi-city-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-default-background.png" style="color: #22e49e;">assets/kiwi-default-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-flower-background.png" style="color: #5fd227;">assets/kiwi-flower-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-green-background.png" style="color: #f19639;">assets/kiwi-green-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-purple-background.png" style="color: #ddb1da;">assets/kiwi-purple-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-space-apple-background.png" style="color: #76a9f3;">assets/kiwi-space-apple-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-swirls-background.png" style="color: #53bc8e;">assets/kiwi-swirls-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-trees-background.png" style="color: #67da9e;">assets/kiwi-trees-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-vaporwave-logo.png" style="color: #2bc5a6;">assets/kiwi-vaporwave-logo.png</a></li>
<h2 style="color: #5c80ec;">src</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/src/generate_file_list.py" style="color: #48b995;">src/generate_file_list.py</a></li></ul>`;
                    break;
            }
            placeholder.innerHTML = file_list_html;
        });
    }
});
</script>
