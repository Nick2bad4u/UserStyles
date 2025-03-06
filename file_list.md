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
                            file_list_html = `<ul><h2 style="color: #91b7f1;">Repo Root</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.black" style="color: #66aa77;">.black</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.copilot-instructions.md" style="color: #a2b2f6;">.copilot-instructions.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.editorconfig" style="color: #ee785c;">.editorconfig</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.gitignore" style="color: #cdbc55;">.gitignore</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.gitleaksignore" style="color: #69ba7f;">.gitleaksignore</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.hintrc" style="color: #a48060;">.hintrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.jsbeautifyrc" style="color: #bd87dc;">.jsbeautifyrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.jscsrc" style="color: #e5b9c3;">.jscsrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.npmrc" style="color: #eb74f7;">.npmrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.pre-commit-config.yaml" style="color: #d980a1;">.pre-commit-config.yaml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.pre-commit-hooks.yaml" style="color: #d59dfd;">.pre-commit-hooks.yaml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierignore" style="color: #b3da1d;">.prettierignore</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierrc" style="color: #7c82ca;">.prettierrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierrc.noplugins" style="color: #56957f;">.prettierrc.noplugins</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierrc.temp" style="color: #2cbbb9;">.prettierrc.temp</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.stylelintrc.json" style="color: #32bcab;">.stylelintrc.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vale.ini" style="color: #eab379;">.vale.ini</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CNAME" style="color: #e0ae33;">CNAME</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CODE_OF_CONDUCT.md" style="color: #58e0c8;">CODE_OF_CONDUCT.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CONTRIBUTING.md" style="color: #4db80b;">CONTRIBUTING.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Gemfile" style="color: #2dfa31;">Gemfile</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Gemfile.lock" style="color: #f4a1fa;">Gemfile.lock</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/KudoAll-Strava-Garmin.user.test.cjs" style="color: #4fb328;">KudoAll-Strava-Garmin.user.test.cjs</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/LICENSE" style="color: #77a643;">LICENSE</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Microsoft.PowerShell_profile.Tests.ps1" style="color: #cf9e4f;">Microsoft.PowerShell_profile.Tests.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Microsoft.PowerShell_profile.ps1" style="color: #e3af77;">Microsoft.PowerShell_profile.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Microsoft.VSCode_profile.ps1" style="color: #fe6253;">Microsoft.VSCode_profile.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures.html" style="color: #b8c2af;">OldRedditNewProfilePictures.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PrettierFormatExcludePreprocessor.ps1" style="color: #8ea7ea;">PrettierFormatExcludePreprocessor.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Profile.ps1" style="color: #d8933d;">Profile.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/README.md" style="color: #b2c557;">README.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SECURITY.md" style="color: #e09d62;">SECURITY.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify-local.html" style="color: #40ea6c;">beautify-local.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify.html" style="color: #f66df5;">beautify.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/convertHexToRgba.html" style="color: #24ed09;">convertHexToRgba.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/cyclingCalculators.html" style="color: #aeb6ab;">cyclingCalculators.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/deno.json" style="color: #e566c9;">deno.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/deno.lock" style="color: #4d947a;">deno.lock</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/eslint.config.mjs" style="color: #4bd633;">eslint.config.mjs</a></li></ul>`;
                            break;
                        case 'file-list-2':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/favicon.ico" style="color: #2fe667;">favicon.ico</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/favicon.png" style="color: #23ed45;">favicon.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/file_list.html" style="color: #b19ecf;">file_list.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/file_list.md" style="color: #b586e2;">file_list.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/generate_gemfile.rb" style="color: #70ba65;">generate_gemfile.rb</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/jsconfig.json" style="color: #69a019;">jsconfig.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/package-lock.json" style="color: #868b6e;">package-lock.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/package.json" style="color: #4bde4b;">package.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/requirements.txt" style="color: #5ea055;">requirements.txt</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/robots.txt" style="color: #6fd0c1;">robots.txt</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/sitemap.xml" style="color: #a19f09;">sitemap.xml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/useragent-switcher-preferences.json" style="color: #e7ba34;">useragent-switcher-preferences.json</a></li>
<h2 style="color: #5bc62b;">Userstyles</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/17track.net-DarkMode.user.css" style="color: #da9c59;">17track.net-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ActivityFixDarkMode.user.css" style="color: #a39152;">ActivityFixDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Archive.orgNightTheme%28Updated%29.user.css" style="color: #91aef3;">Archive.orgNightTheme(Updated).user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Benjdd-dark.user.css" style="color: #bea85a;">Benjdd-dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CFG.tf-DarkMode.user.css" style="color: #b68042;">CFG.tf-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CSSGradient-DarkMode.user.css" style="color: #d37c7a;">CSSGradient-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CSSPortal-Dark.user.css" style="color: #b098d6;">CSSPortal-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Copilot-Microsoft-Blackmode.user.css" style="color: #c380a2;">Copilot-Microsoft-Blackmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CrystalMathLabs-BlackMode.user.css" style="color: #7bb8a7;">CrystalMathLabs-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/DCRainMaker-DarkMode.user.css" style="color: #6fa1a0;">DCRainMaker-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Dearrow-RemoveDearrowButton.user.css" style="color: #57e853;">Dearrow-RemoveDearrowButton.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/DeepSeek-DarkMode.user.css" style="color: #2cb3ff;">DeepSeek-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ESPN-DarkMode.user.css" style="color: #4ac371;">ESPN-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/FandomDark.user.css" style="color: #90a378;">FandomDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Favero-DarkMode.user.css" style="color: #e7801f;">Favero-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Fedex.com-DarkMode.user.css" style="color: #66adbd;">Fedex.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/FitFileViewer-DarkTheme.user.css" style="color: #35d4d8;">FitFileViewer-DarkTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/FiveServer-DarkMode.user.css" style="color: #54e963;">FiveServer-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GOTOES.org-DarkMode.user.css" style="color: #87995c;">GOTOES.org-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GTBikeV-DarkMode.user.css" style="color: #2ad362;">GTBikeV-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminBadges-DarkMode.user.css" style="color: #57f169;">GarminBadges-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminConnectDark.user.css" style="color: #7e79e3;">GarminConnectDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminRumors-DarkMode.user.css" style="color: #cac393;">GarminRumors-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GreasyForkDark.user.css" style="color: #4ff642;">GreasyForkDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Gyazo-DarkMode.user.css" style="color: #739b08;">Gyazo-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Kiwifarms-Black.user.css" style="color: #9c9a00;">Kiwifarms-Black.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Kiwifarms-Halloween.user.css" style="color: #cea736;">Kiwifarms-Halloween.user.css</a></li></ul>`;
                            break;
                        case 'file-list-3':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Kiwifarms-Vaporwave.user.css" style="color: #fa5e6a;">Kiwifarms-Vaporwave.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Klimat.app-DarkMode.user.css" style="color: #6cc3db;">Klimat.app-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MarkdownViewer%2B%2BTheme.user.css" style="color: #aeb4d4;">MarkdownViewer++Theme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Medicare-Gov-Dark-Mode.user.css" style="color: #39d469;">Medicare-Gov-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MyBikeTraffic-DarkMode.user.css" style="color: #9e9e8d;">MyBikeTraffic-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MyWorkoutCompanion-Dark.user.css" style="color: #99c99c;">MyWorkoutCompanion-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Nascar.com-DarkMode.user.css" style="color: #e29220;">Nascar.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/NewYorkerDarkMode.user.css" style="color: #e863f1;">NewYorkerDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/NewYorkerSimpleDarkMode.user.css" style="color: #c8ba79;">NewYorkerSimpleDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRS-HiScores-BlackMode.user.css" style="color: #c185a3;">OSRS-HiScores-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWorldHeatmap-Dark.user.css" style="color: #5d9bf5;">OSRSWorldHeatmap-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OsrsWikiDarkMode.user.css" style="color: #ada6a8;">OsrsWikiDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Papertrails-DarkMode.user.css" style="color: #2cca8b;">Papertrails-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PathFinderW3School-Dark.user.css" style="color: #23a0eb;">PathFinderW3School-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PowerMeter.cc-DarkMode.user.css" style="color: #f3aa96;">PowerMeter.cc-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PromptHero-Dark.user.css" style="color: #a8ca68;">PromptHero-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RedditColoredComments.user.css" style="color: #47f0a1;">RedditColoredComments.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Scrap.tf-BlackTheme.user.css" style="color: #36e9e8;">Scrap.tf-BlackTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Skial-CustomTheme.user.css" style="color: #fc857e;">Skial-CustomTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SportSurge-BlackMode.user.css" style="color: #e56f19;">SportSurge-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SquadRats-Dark.user.css" style="color: #2fb4c0;">SquadRats-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Statshunters-Dark.user.css" style="color: #f484b6;">Statshunters-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamDB-Black-Mode.user.css" style="color: #83df40;">SteamDB-Black-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamDB-Dark-Mode.user.css" style="color: #949593;">SteamDB-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Brawlhalla.user.css" style="color: #65cb65;">SteamStat.us-Re-Remastered-Brawlhalla.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Christmas-Style.user.css" style="color: #b7c84c;">SteamStat.us-Re-Remastered-Christmas-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Detroit-Lions-Style.user.css" style="color: #87c21a;">SteamStat.us-Re-Remastered-Detroit-Lions-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Detroit-Tigers.user.css" style="color: #f36bf4;">SteamStat.us-Re-Remastered-Detroit-Tigers.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Easter-Style.user.css" style="color: #83cf03;">SteamStat.us-Re-Remastered-Easter-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Green-BlackStyle.user.css" style="color: #eeb434;">SteamStat.us-Re-Remastered-Green-BlackStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Halloween-Style.user.css" style="color: #df8175;">SteamStat.us-Re-Remastered-Halloween-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Lime%20Green-Purple%20Style.user.css" style="color: #e9b679;">SteamStat.us-Re-Remastered-Lime Green-Purple Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Miami-Heat.user.css" style="color: #88b1ef;">SteamStat.us-Re-Remastered-Miami-Heat.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-NASCAR.user.css" style="color: #c188b1;">SteamStat.us-Re-Remastered-NASCAR.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Orange-BlackStyle.user.css" style="color: #7e98c2;">SteamStat.us-Re-Remastered-Orange-BlackStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-PCMasterRace.user.css" style="color: #b87487;">SteamStat.us-Re-Remastered-PCMasterRace.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Pink-BlackStyle.user.css" style="color: #45be41;">SteamStat.us-Re-Remastered-Pink-BlackStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Purple.user.css" style="color: #c4d51a;">SteamStat.us-Re-Remastered-Purple.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-RainbowStyle.user.css" style="color: #638e57;">SteamStat.us-Re-Remastered-RainbowStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-SteamStyle.user.css" style="color: #e960c4;">SteamStat.us-Re-Remastered-SteamStyle.user.css</a></li></ul>`;
                            break;
                        case 'file-list-4':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Sunset-Style.user.css" style="color: #ab9e01;">SteamStat.us-Re-Remastered-Sunset-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-TeamFortress2.user.css" style="color: #38ac16;">SteamStat.us-Re-Remastered-TeamFortress2.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-The-Crew-Motorfest.user.css" style="color: #e38998;">SteamStat.us-Re-Remastered-The-Crew-Motorfest.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-TourDeFrance.user.css" style="color: #6ce642;">SteamStat.us-Re-Remastered-TourDeFrance.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-USA-Style.user.css" style="color: #2cf672;">SteamStat.us-Re-Remastered-USA-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Windows95.user.css" style="color: #a377eb;">SteamStat.us-Re-Remastered-Windows95.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Witcher3.user.css" style="color: #28bfde;">SteamStat.us-Re-Remastered-Witcher3.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Wolverines-Style.user.css" style="color: #38c3ed;">SteamStat.us-Re-Remastered-Wolverines-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-WorldOfWarcraft.user.css" style="color: #a0c6d2;">SteamStat.us-Re-Remastered-WorldOfWarcraft.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Zwift.user.css" style="color: #45a3e1;">SteamStat.us-Re-Remastered-Zwift.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered.user.css" style="color: #2fda4b;">SteamStat.us-Re-Remastered.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamTradeMatcher-DarkMode.user.css" style="color: #aeb3b4;">SteamTradeMatcher-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StepSecurityDarkMode.user.css" style="color: #2baf78;">StepSecurityDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaAutoDarkTheme.user.css" style="color: #5df62a;">StravaAutoDarkTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaStratTracker-DarkMode.user.css" style="color: #be8773;">StravaStratTracker-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StreamingSitesStreamsBlackDarkMode.user.css" style="color: #39c63a;">StreamingSitesStreamsBlackDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Stylus-DarkTheme-Updated.user.css" style="color: #4be91c;">Stylus-DarkTheme-Updated.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StylusEditorChromeDark-Fixed.user.css" style="color: #a2d56d;">StylusEditorChromeDark-Fixed.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StylusFluent-Updated.user.css" style="color: #24a9f9;">StylusFluent-Updated.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TamperMonkey-DarkGreen.user.css" style="color: #b4c2cd;">TamperMonkey-DarkGreen.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TamperMonkey-DarkMode.user.css" style="color: #7cd297;">TamperMonkey-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TeamFortressWIki-Dark.user.css" style="color: #f48f1f;">TeamFortressWIki-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TechPowerUp-DarkMode.user.css" style="color: #afae2b;">TechPowerUp-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TrainingPeaks-DarkMode.user.css" style="color: #56ac06;">TrainingPeaks-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UPS.com-DarkMode.user.css" style="color: #5cc83f;">UPS.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Unroll.me-DarkMode.user.css" style="color: #9b952b;">Unroll.me-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UptimeRobotDark.user.css" style="color: #9dc08c;">UptimeRobotDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserStyle-Root-ColorTemplate.user.css" style="color: #92c886;">UserStyle-Root-ColorTemplate.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserscriptTemplate.user.css" style="color: #2caff0;">UserscriptTemplate.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserscriptZone-Dark.user.css" style="color: #e95ff4;">UserscriptZone-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserstyleWorld-DarkBamaBraves.user.css" style="color: #8dcae6;">UserstyleWorld-DarkBamaBraves.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/VisualStudioCode-DarkMode.user.css" style="color: #f96bbf;">VisualStudioCode-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/WahooFitnessDarkMode.user.css" style="color: #a5a0be;">WahooFitnessDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Walmart.com-DarkMode.user.css" style="color: #4ad243;">Walmart.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wanderer-Dark.user.css" style="color: #d765d3;">Wanderer-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Weather.com-DarkMode.user.css" style="color: #d6b264;">Weather.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/WebHint-Dark.user.css" style="color: #50cb19;">WebHint-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wigle-DarkMode-Beta.user.css" style="color: #aa9a34;">Wigle-DarkMode-Beta.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wigle-DarkMode.user.css" style="color: #fab1a1;">Wigle-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wikipedia-OLED-SettingsPage.user.css" style="color: #f08de3;">Wikipedia-OLED-SettingsPage.user.css</a></li></ul>`;
                            break;
                        case 'file-list-5':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Windy-DarkMode.user.css" style="color: #a3b77c;">Windy-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YT-Vibra.user.css" style="color: #89cde7;">YT-Vibra.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeRainbowProgress.user.css" style="color: #e09497;">YoutubeRainbowProgress.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeScrubberColors.user.css" style="color: #cd920a;">YoutubeScrubberColors.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeTV-BlackMode.user.css" style="color: #5c889b;">YoutubeTV-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Zwift.com-Dark-Mode.user.css" style="color: #cfc6b9;">Zwift.com-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwiftHacks-DarkMode.user.css" style="color: #39ee0c;">ZwiftHacks-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwiftInsiderDarkMode.user.css" style="color: #4beb14;">ZwiftInsiderDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwiftPower.comDark%20Mode.user.css" style="color: #b4d302;">ZwiftPower.comDark Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Zwiftalizer.com-Darker-Mode.user.css" style="color: #53d971;">Zwiftalizer.com-Darker-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwifterBikesDarkMode.user.css" style="color: #4bdd4a;">ZwifterBikesDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/abcnews.go.com-DarkMode.user.css" style="color: #a9b31d;">abcnews.go.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/bicycling-DarkMode.user.css" style="color: #d766a1;">bicycling-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/detroitmi.gov-DarkMode.user.css" style="color: #acdf03;">detroitmi.gov-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ebay-Dark-Mode.user.css" style="color: #e87955;">ebay-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/findthatride-darkmode.user.css" style="color: #9db270;">findthatride-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/fitfiletools-darkmode.user.css" style="color: #98b332;">fitfiletools-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/fivethirtyeight.comDarkMode.user.css" style="color: #6ab605;">fivethirtyeight.comDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/jalopnik.com-DarkMode.user.css" style="color: #30be81;">jalopnik.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/kom.club-darkmode.user.css" style="color: #b2d44a;">kom.club-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/makinolo.com-Dark-Mode.user.css" style="color: #3bf921;">makinolo.com-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/michigan.gov-DarkMode.user.css" style="color: #22dbc9;">michigan.gov-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/mywindsock-darkmode.user.css" style="color: #60c1fd;">mywindsock-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/nbcwashington.com-DarkMode.user.css" style="color: #ff7f11;">nbcwashington.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/nytimes.com-DarkModeSimple.user.css" style="color: #d578ee;">nytimes.com-DarkModeSimple.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/p337info-tf2.user.css" style="color: #37ed54;">p337info-tf2.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/runalyze-darkmode.user.css" style="color: #699f45;">runalyze-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/stravatoolbox-darkmode.user.css" style="color: #75e808;">stravatoolbox-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/veloviewer-darkmode.user.css" style="color: #31a272;">veloviewer-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/zwifthub.com-darkmode.user.css" style="color: #e2852c;">zwifthub.com-darkmode.user.css</a></li>
<h2 style="color: #abc008;">Userscripts</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/AscentDescentMetersToFeet.user.js" style="color: #a2818c;">AscentDescentMetersToFeet.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/AutoMergeDependabotPRs.user.js" style="color: #f16e01;">AutoMergeDependabotPRs.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/DeleteYoutubePlaylists.user.js" style="color: #bfb4a7;">DeleteYoutubePlaylists.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnhanceYouTubeProfilePictures.user.js" style="color: #b97182;">EnhanceYouTubeProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnlargeKiwifarmsProfilePictures.user.js" style="color: #9ad3c8;">EnlargeKiwifarmsProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnlargeYouTubeChatProfilePictures.user.js" style="color: #71c231;">EnlargeYouTubeChatProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnlargeYouTubeCommentSectionProfilePictures.user.js" style="color: #d4c427;">EnlargeYouTubeCommentSectionProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GOTOESFitFileEditor-AutoClosePopup.user.js" style="color: #9fa085;">GOTOESFitFileEditor-AutoClosePopup.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminConnectRemoveGear.user.js" style="color: #45d3f5;">GarminConnectRemoveGear.user.js</a></li></ul>`;
                            break;
                        case 'file-list-6':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GithubMarkMergedDone.user.js" style="color: #7cd18e;">GithubMarkMergedDone.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GyazoDirectLink.user.js" style="color: #a8b1a5;">GyazoDirectLink.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/HideChineseUserstyles.user.js" style="color: #6ba57d;">HideChineseUserstyles.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/HideNon-EnglishUserstyles.user.js" style="color: #f86e17;">HideNon-EnglishUserstyles.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/KudoAll-Strava-Garmin.user.js" style="color: #99860b;">KudoAll-Strava-Garmin.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MergeDependabotPRs.user.js" style="color: #63dff9;">MergeDependabotPRs.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWikiAuto-Categorizer-SlowMode.user.js" style="color: #c4cc29;">OSRSWikiAuto-Categorizer-SlowMode.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWikiAuto-Categorizer.user.js" style="color: #86c0bd;">OSRSWikiAuto-Categorizer.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWikiAuto-Navbox-SlowMode.user.js" style="color: #e697ee;">OSRSWikiAuto-Navbox-SlowMode.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-API-Key-Version-Reddit-Only-Version.user.js" style="color: #d0d241;">OldRedditNewProfilePictures-API-Key-Version-Reddit-Only-Version.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-API-Key-Version-Reddit-Stream-Version.user.js" style="color: #6cb0df;">OldRedditNewProfilePictures-API-Key-Version-Reddit-Stream-Version.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-API-Key-Version.user.js" style="color: #59b162;">OldRedditNewProfilePictures-API-Key-Version.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-UniversalVersion.user.js" style="color: #4bc7bb;">OldRedditNewProfilePictures-UniversalVersion.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures.user.js" style="color: #cecb5a;">OldRedditNewProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures/Old%20Reddit%20with%20New%20Profile%20Pictures.user.js" style="color: #65c290;">OldRedditNewProfilePictures/Old Reddit with New Profile Pictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RedditStreamAutoRefresher.user.js" style="color: #76bf99;">RedditStreamAutoRefresher.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RedditStreamAutoRefresherFaster.user.js" style="color: #65975b;">RedditStreamAutoRefresherFaster.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RightClickEnable.user.js" style="color: #44ba26;">RightClickEnable.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaAutoAuthorize.user.js" style="color: #b6ab26;">StravaAutoAuthorize.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaTextAuto-Selector.user.js" style="color: #37a4d8;">StravaTextAuto-Selector.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SuperchargedLocalDirectoryWebUI.user.js" style="color: #64c1a7;">SuperchargedLocalDirectoryWebUI.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserstyleWorld-SyncStyles.user.js" style="color: #36aeba;">UserstyleWorld-SyncStyles.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTV-Volume-Rememberer.user.js" style="color: #7cb4fa;">YouTubeTV-Volume-Rememberer.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl.user.js" style="color: #f88dfc;">YouTubeTVVolumeControl.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl.user.js" style="color: #e2a1e5;">YouTubeVolumeControl.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeVolumeDisplay.user.js" style="color: #9fdf1a;">YoutubeVolumeDisplay.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Zwift-Give-RideOns-to-Everyone.user.js" style="color: #7a85a2;">Zwift-Give-RideOns-to-Everyone.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/reddit-stream-Enhancements.user.js" style="color: #d0d22d;">reddit-stream-Enhancements.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-Add-Balance-Original.user.js" style="color: #7cae1a;">strava-balance/Strava-Add-Balance-Original.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-Add-Balance-Updated.user.js" style="color: #b597c2;">strava-balance/Strava-Add-Balance-Updated.user.js</a></li>
<h2 style="color: #91ac2b;">CSS</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Discord-Dark%2B-Default-Member-List.css" style="color: #b2b5ae;">Discord-Dark+-Default-Member-List.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/styles.css" style="color: #47b71a;">YouTubeVolumeControl/styles.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.css" style="color: #e09ad1;">codemirror.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.min.css" style="color: #b7966e;">codemirror.min.css</a></li>
<h2 style="color: #f69e29;">JavaScript</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.eslintrc.js" style="color: #5fd6c6;">.eslintrc.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/background.js" style="color: #b77889;">SteamCookieExtractor2/background.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/content.js" style="color: #b38fa5;">SteamCookieExtractor2/content.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/options.js" style="color: #58d2ac;">SteamCookieExtractor2/options.js</a></li></ul>`;
                            break;
                        case 'file-list-7':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/popup.js" style="color: #e3855a;">SteamCookieExtractor2/popup.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/WIndyPlugin.min.js" style="color: #a9a555;">WIndyPlugin.min.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/background.js" style="color: #76dced;">YouTubeTVVolumeControl/background.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/content.js" style="color: #d2bd0c;">YouTubeTVVolumeControl/content.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/background.js" style="color: #98cdb7;">YouTubeVolumeControl/background.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/content.js" style="color: #8ec943;">YouTubeVolumeControl/content.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify-css-mod.js" style="color: #33bbfc;">beautify-css-mod.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify.js" style="color: #32e56e;">beautify.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.js" style="color: #2b92d1;">codemirror.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.min.js" style="color: #94a41d;">codemirror.min.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/convertHexToRgba.js" style="color: #d4ac1d;">convertHexToRgba.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/css.js" style="color: #40e676;">css.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/css.min.js" style="color: #74c86c;">css.min.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/cyclingCalculators.js" style="color: #2ddffb;">cyclingCalculators.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-AddBalance-Updated.js" style="color: #ae8de2;">strava-balance/Strava-AddBalance-Updated.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-AddBalance.js" style="color: #b4b2ba;">strava-balance/Strava-AddBalance.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/binary-Updated.js" style="color: #d2b40e;">strava-balance/binary-Updated.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/binary.js" style="color: #4baeb0;">strava-balance/binary.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/buffer-5.6.1/base64-js-1.3.1/index.js" style="color: #5a9fb4;">strava-balance/buffer-5.6.1/base64-js-1.3.1/index.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/buffer-5.6.1/ieee754-1.1.13/index.js" style="color: #2ee9cd;">strava-balance/buffer-5.6.1/ieee754-1.1.13/index.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/buffer-5.6.1/index.js" style="color: #9eaeab;">strava-balance/buffer-5.6.1/index.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/fit-parser-Updated.js" style="color: #9b967c;">strava-balance/fit-parser-Updated.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/fit-parser.js" style="color: #60d428;">strava-balance/fit-parser.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/fit.js" style="color: #36e6ac;">strava-balance/fit.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/messages.js" style="color: #9d823d;">strava-balance/messages.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/strava-fit-parser.js" style="color: #49e90a;">strava-balance/strava-fit-parser.js</a></li>
<h2 style="color: #ed62f4;">YAML</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/dependabot.yml" style="color: #6fba8d;">.github/dependabot.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/labeler.yml" style="color: #6f9e41;">.github/labeler.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/ActionLint.yml" style="color: #bc8a5e;">.github/workflows/ActionLint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/Bandit.yml" style="color: #3bf43f;">.github/workflows/Bandit.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/Snake.yml" style="color: #4196a4;">.github/workflows/Snake.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/black-formatter.yml" style="color: #bec6ed;">.github/workflows/black-formatter.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/codeql.yml" style="color: #e29527;">.github/workflows/codeql.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/defender.yml" style="color: #d19fae;">.github/workflows/defender.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/deno.yml" style="color: #e2797c;">.github/workflows/deno.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/dependency-review.yml" style="color: #86abc4;">.github/workflows/dependency-review.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/devskim.yml" style="color: #2bed4b;">.github/workflows/devskim.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/eslint.yml" style="color: #d4a756;">.github/workflows/eslint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/generate-file-list.yml" style="color: #808e17;">.github/workflows/generate-file-list.yml</a></li></ul>`;
                            break;
                        case 'file-list-8':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/greetings.yml" style="color: #97c77d;">.github/workflows/greetings.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/label.yml" style="color: #5c9348;">.github/workflows/label.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/ossar.yml" style="color: #c7933e;">.github/workflows/ossar.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/osv-scanner.yml" style="color: #e29ff6;">.github/workflows/osv-scanner.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/scorecards.yml" style="color: #90e06f;">.github/workflows/scorecards.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/semgrep.yml" style="color: #85a877;">.github/workflows/semgrep.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/sitemap.yml" style="color: #83c35d;">.github/workflows/sitemap.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/sobelow.yml" style="color: #cea670;">.github/workflows/sobelow.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/stale.yml" style="color: #e46db9;">.github/workflows/stale.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/static.yml" style="color: #3ac184;">.github/workflows/static.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/stylelint.yml" style="color: #e89a00;">.github/workflows/stylelint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/super-linter.yml" style="color: #718e6a;">.github/workflows/super-linter.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.markdownlint.yml" style="color: #43b154;">.markdownlint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.scss-lint.yml" style="color: #76afd6;">.scss-lint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/_config.yml" style="color: #9ad330;">_config.yml</a></li>
<h2 style="color: #65d1e3;">.github/PULL_REQUEST_TEMPLATE</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/PULL_REQUEST_TEMPLATE/pull_request_template.md" style="color: #a4a04c;">.github/PULL_REQUEST_TEMPLATE/pull_request_template.md</a></li>
<h2 style="color: #4bdc04;">.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/bug_report.md" style="color: #6bec4d;">.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/bug_report.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/feature_request.md" style="color: #36d607;">.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/feature_request.md</a></li>
<h2 style="color: #e499c5;">.vscode</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/generate_file_list.py" style="color: #269afa;">.vscode/generate_file_list.py</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/launch.json" style="color: #31c560;">.vscode/launch.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/settings.json" style="color: #53c1ef;">.vscode/settings.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/tasks.json" style="color: #d99856;">.vscode/tasks.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/test_generate_file_list.py" style="color: #dd6afc;">.vscode/test_generate_file_list.py</a></li>
<h2 style="color: #28ef42;">OldRedditNewProfilePictures</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures/Old%20Reddit%20with%20New%20Profile%20Pictures.options.json" style="color: #66da7e;">OldRedditNewProfilePictures/Old Reddit with New Profile Pictures.options.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures/Old%20Reddit%20with%20New%20Profile%20Pictures.storage.json" style="color: #8edf0c;">OldRedditNewProfilePictures/Old Reddit with New Profile Pictures.storage.json</a></li>
<h2 style="color: #acac6f;">SteamCookieExtractor2</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/manifest.json" style="color: #df9a28;">SteamCookieExtractor2/manifest.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/options.html" style="color: #74c0e4;">SteamCookieExtractor2/options.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/popup.html" style="color: #a990bd;">SteamCookieExtractor2/popup.html</a></li>
<h2 style="color: #449cb3;">SteamCookieExtractor2/icons</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/icon128.png" style="color: #e7ad69;">SteamCookieExtractor2/icons/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/icon16.png" style="color: #dbab03;">SteamCookieExtractor2/icons/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/icon48.png" style="color: #d48ef1;">SteamCookieExtractor2/icons/icon48.png</a></li>
<h2 style="color: #e0c91f;">SteamCookieExtractor2/icons/images</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/images/icon128.png" style="color: #70ca2a;">SteamCookieExtractor2/icons/images/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/images/icon16.png" style="color: #83ad66;">SteamCookieExtractor2/icons/images/icon16.png</a></li></ul>`;
                            break;
                        case 'file-list-9':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/images/icon48.png" style="color: #3fdbde;">SteamCookieExtractor2/icons/images/icon48.png</a></li>
<h2 style="color: #9bd5c3;">YouTubeTVVolumeControl</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/icon128.png" style="color: #899431;">YouTubeTVVolumeControl/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/icon16.png" style="color: #82996a;">YouTubeTVVolumeControl/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/icon48.png" style="color: #8abfa8;">YouTubeTVVolumeControl/icon48.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/manifest.json" style="color: #27e106;">YouTubeTVVolumeControl/manifest.json</a></li>
<h2 style="color: #89b615;">YouTubeVolumeControl</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icon128.png" style="color: #ec7f68;">YouTubeVolumeControl/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icon16.png" style="color: #c69e22;">YouTubeVolumeControl/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icon48.png" style="color: #77ba4c;">YouTubeVolumeControl/icon48.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/manifest.json" style="color: #75c8ab;">YouTubeVolumeControl/manifest.json</a></li>
<h2 style="color: #5b9d63;">YouTubeVolumeControl/icons</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/icon128.png" style="color: #a272b9;">YouTubeVolumeControl/icons/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/icon16.png" style="color: #3fd982;">YouTubeVolumeControl/icons/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/icon48.png" style="color: #95a16f;">YouTubeVolumeControl/icons/icon48.png</a></li>
<h2 style="color: #74b162;">YouTubeVolumeControl/icons/images</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/images/icon128.png" style="color: #28da87;">YouTubeVolumeControl/icons/images/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/images/icon16.png" style="color: #ba72d4;">YouTubeVolumeControl/icons/images/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/images/icon48.png" style="color: #4ed0bf;">YouTubeVolumeControl/icons/images/icon48.png</a></li>
<h2 style="color: #eea995;">assets</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-city-background.png" style="color: #4bc513;">assets/kiwi-city-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-default-background.png" style="color: #efb6c3;">assets/kiwi-default-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-flower-background.png" style="color: #2ec1d5;">assets/kiwi-flower-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-green-background.png" style="color: #8fb958;">assets/kiwi-green-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-purple-background.png" style="color: #c5c7ae;">assets/kiwi-purple-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-space-apple-background.png" style="color: #5bbe16;">assets/kiwi-space-apple-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-swirls-background.png" style="color: #b572a5;">assets/kiwi-swirls-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-trees-background.png" style="color: #62ea82;">assets/kiwi-trees-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-vaporwave-logo.png" style="color: #d6b31a;">assets/kiwi-vaporwave-logo.png</a></li>
<h2 style="color: #53f62a;">src</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/src/generate_file_list.py" style="color: #ee65c2;">src/generate_file_list.py</a></li></ul>`;
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
                    file_list_html = `<ul><h2 style="color: #91b7f1;">Repo Root</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.black" style="color: #66aa77;">.black</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.copilot-instructions.md" style="color: #a2b2f6;">.copilot-instructions.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.editorconfig" style="color: #ee785c;">.editorconfig</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.gitignore" style="color: #cdbc55;">.gitignore</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.gitleaksignore" style="color: #69ba7f;">.gitleaksignore</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.hintrc" style="color: #a48060;">.hintrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.jsbeautifyrc" style="color: #bd87dc;">.jsbeautifyrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.jscsrc" style="color: #e5b9c3;">.jscsrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.npmrc" style="color: #eb74f7;">.npmrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.pre-commit-config.yaml" style="color: #d980a1;">.pre-commit-config.yaml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.pre-commit-hooks.yaml" style="color: #d59dfd;">.pre-commit-hooks.yaml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierignore" style="color: #b3da1d;">.prettierignore</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierrc" style="color: #7c82ca;">.prettierrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierrc.noplugins" style="color: #56957f;">.prettierrc.noplugins</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierrc.temp" style="color: #2cbbb9;">.prettierrc.temp</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.stylelintrc.json" style="color: #32bcab;">.stylelintrc.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vale.ini" style="color: #eab379;">.vale.ini</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CNAME" style="color: #e0ae33;">CNAME</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CODE_OF_CONDUCT.md" style="color: #58e0c8;">CODE_OF_CONDUCT.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CONTRIBUTING.md" style="color: #4db80b;">CONTRIBUTING.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Gemfile" style="color: #2dfa31;">Gemfile</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Gemfile.lock" style="color: #f4a1fa;">Gemfile.lock</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/KudoAll-Strava-Garmin.user.test.cjs" style="color: #4fb328;">KudoAll-Strava-Garmin.user.test.cjs</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/LICENSE" style="color: #77a643;">LICENSE</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Microsoft.PowerShell_profile.Tests.ps1" style="color: #cf9e4f;">Microsoft.PowerShell_profile.Tests.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Microsoft.PowerShell_profile.ps1" style="color: #e3af77;">Microsoft.PowerShell_profile.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Microsoft.VSCode_profile.ps1" style="color: #fe6253;">Microsoft.VSCode_profile.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures.html" style="color: #b8c2af;">OldRedditNewProfilePictures.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PrettierFormatExcludePreprocessor.ps1" style="color: #8ea7ea;">PrettierFormatExcludePreprocessor.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Profile.ps1" style="color: #d8933d;">Profile.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/README.md" style="color: #b2c557;">README.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SECURITY.md" style="color: #e09d62;">SECURITY.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify-local.html" style="color: #40ea6c;">beautify-local.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify.html" style="color: #f66df5;">beautify.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/convertHexToRgba.html" style="color: #24ed09;">convertHexToRgba.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/cyclingCalculators.html" style="color: #aeb6ab;">cyclingCalculators.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/deno.json" style="color: #e566c9;">deno.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/deno.lock" style="color: #4d947a;">deno.lock</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/eslint.config.mjs" style="color: #4bd633;">eslint.config.mjs</a></li></ul>`;
                    break;
                case 'file-list-2':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/favicon.ico" style="color: #2fe667;">favicon.ico</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/favicon.png" style="color: #23ed45;">favicon.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/file_list.html" style="color: #b19ecf;">file_list.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/file_list.md" style="color: #b586e2;">file_list.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/generate_gemfile.rb" style="color: #70ba65;">generate_gemfile.rb</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/jsconfig.json" style="color: #69a019;">jsconfig.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/package-lock.json" style="color: #868b6e;">package-lock.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/package.json" style="color: #4bde4b;">package.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/requirements.txt" style="color: #5ea055;">requirements.txt</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/robots.txt" style="color: #6fd0c1;">robots.txt</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/sitemap.xml" style="color: #a19f09;">sitemap.xml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/useragent-switcher-preferences.json" style="color: #e7ba34;">useragent-switcher-preferences.json</a></li>
<h2 style="color: #5bc62b;">Userstyles</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/17track.net-DarkMode.user.css" style="color: #da9c59;">17track.net-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ActivityFixDarkMode.user.css" style="color: #a39152;">ActivityFixDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Archive.orgNightTheme%28Updated%29.user.css" style="color: #91aef3;">Archive.orgNightTheme(Updated).user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Benjdd-dark.user.css" style="color: #bea85a;">Benjdd-dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CFG.tf-DarkMode.user.css" style="color: #b68042;">CFG.tf-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CSSGradient-DarkMode.user.css" style="color: #d37c7a;">CSSGradient-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CSSPortal-Dark.user.css" style="color: #b098d6;">CSSPortal-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Copilot-Microsoft-Blackmode.user.css" style="color: #c380a2;">Copilot-Microsoft-Blackmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CrystalMathLabs-BlackMode.user.css" style="color: #7bb8a7;">CrystalMathLabs-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/DCRainMaker-DarkMode.user.css" style="color: #6fa1a0;">DCRainMaker-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Dearrow-RemoveDearrowButton.user.css" style="color: #57e853;">Dearrow-RemoveDearrowButton.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/DeepSeek-DarkMode.user.css" style="color: #2cb3ff;">DeepSeek-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ESPN-DarkMode.user.css" style="color: #4ac371;">ESPN-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/FandomDark.user.css" style="color: #90a378;">FandomDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Favero-DarkMode.user.css" style="color: #e7801f;">Favero-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Fedex.com-DarkMode.user.css" style="color: #66adbd;">Fedex.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/FitFileViewer-DarkTheme.user.css" style="color: #35d4d8;">FitFileViewer-DarkTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/FiveServer-DarkMode.user.css" style="color: #54e963;">FiveServer-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GOTOES.org-DarkMode.user.css" style="color: #87995c;">GOTOES.org-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GTBikeV-DarkMode.user.css" style="color: #2ad362;">GTBikeV-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminBadges-DarkMode.user.css" style="color: #57f169;">GarminBadges-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminConnectDark.user.css" style="color: #7e79e3;">GarminConnectDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminRumors-DarkMode.user.css" style="color: #cac393;">GarminRumors-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GreasyForkDark.user.css" style="color: #4ff642;">GreasyForkDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Gyazo-DarkMode.user.css" style="color: #739b08;">Gyazo-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Kiwifarms-Black.user.css" style="color: #9c9a00;">Kiwifarms-Black.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Kiwifarms-Halloween.user.css" style="color: #cea736;">Kiwifarms-Halloween.user.css</a></li></ul>`;
                    break;
                case 'file-list-3':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Kiwifarms-Vaporwave.user.css" style="color: #fa5e6a;">Kiwifarms-Vaporwave.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Klimat.app-DarkMode.user.css" style="color: #6cc3db;">Klimat.app-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MarkdownViewer%2B%2BTheme.user.css" style="color: #aeb4d4;">MarkdownViewer++Theme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Medicare-Gov-Dark-Mode.user.css" style="color: #39d469;">Medicare-Gov-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MyBikeTraffic-DarkMode.user.css" style="color: #9e9e8d;">MyBikeTraffic-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MyWorkoutCompanion-Dark.user.css" style="color: #99c99c;">MyWorkoutCompanion-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Nascar.com-DarkMode.user.css" style="color: #e29220;">Nascar.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/NewYorkerDarkMode.user.css" style="color: #e863f1;">NewYorkerDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/NewYorkerSimpleDarkMode.user.css" style="color: #c8ba79;">NewYorkerSimpleDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRS-HiScores-BlackMode.user.css" style="color: #c185a3;">OSRS-HiScores-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWorldHeatmap-Dark.user.css" style="color: #5d9bf5;">OSRSWorldHeatmap-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OsrsWikiDarkMode.user.css" style="color: #ada6a8;">OsrsWikiDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Papertrails-DarkMode.user.css" style="color: #2cca8b;">Papertrails-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PathFinderW3School-Dark.user.css" style="color: #23a0eb;">PathFinderW3School-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PowerMeter.cc-DarkMode.user.css" style="color: #f3aa96;">PowerMeter.cc-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PromptHero-Dark.user.css" style="color: #a8ca68;">PromptHero-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RedditColoredComments.user.css" style="color: #47f0a1;">RedditColoredComments.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Scrap.tf-BlackTheme.user.css" style="color: #36e9e8;">Scrap.tf-BlackTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Skial-CustomTheme.user.css" style="color: #fc857e;">Skial-CustomTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SportSurge-BlackMode.user.css" style="color: #e56f19;">SportSurge-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SquadRats-Dark.user.css" style="color: #2fb4c0;">SquadRats-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Statshunters-Dark.user.css" style="color: #f484b6;">Statshunters-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamDB-Black-Mode.user.css" style="color: #83df40;">SteamDB-Black-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamDB-Dark-Mode.user.css" style="color: #949593;">SteamDB-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Brawlhalla.user.css" style="color: #65cb65;">SteamStat.us-Re-Remastered-Brawlhalla.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Christmas-Style.user.css" style="color: #b7c84c;">SteamStat.us-Re-Remastered-Christmas-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Detroit-Lions-Style.user.css" style="color: #87c21a;">SteamStat.us-Re-Remastered-Detroit-Lions-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Detroit-Tigers.user.css" style="color: #f36bf4;">SteamStat.us-Re-Remastered-Detroit-Tigers.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Easter-Style.user.css" style="color: #83cf03;">SteamStat.us-Re-Remastered-Easter-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Green-BlackStyle.user.css" style="color: #eeb434;">SteamStat.us-Re-Remastered-Green-BlackStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Halloween-Style.user.css" style="color: #df8175;">SteamStat.us-Re-Remastered-Halloween-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Lime%20Green-Purple%20Style.user.css" style="color: #e9b679;">SteamStat.us-Re-Remastered-Lime Green-Purple Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Miami-Heat.user.css" style="color: #88b1ef;">SteamStat.us-Re-Remastered-Miami-Heat.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-NASCAR.user.css" style="color: #c188b1;">SteamStat.us-Re-Remastered-NASCAR.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Orange-BlackStyle.user.css" style="color: #7e98c2;">SteamStat.us-Re-Remastered-Orange-BlackStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-PCMasterRace.user.css" style="color: #b87487;">SteamStat.us-Re-Remastered-PCMasterRace.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Pink-BlackStyle.user.css" style="color: #45be41;">SteamStat.us-Re-Remastered-Pink-BlackStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Purple.user.css" style="color: #c4d51a;">SteamStat.us-Re-Remastered-Purple.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-RainbowStyle.user.css" style="color: #638e57;">SteamStat.us-Re-Remastered-RainbowStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-SteamStyle.user.css" style="color: #e960c4;">SteamStat.us-Re-Remastered-SteamStyle.user.css</a></li></ul>`;
                    break;
                case 'file-list-4':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Sunset-Style.user.css" style="color: #ab9e01;">SteamStat.us-Re-Remastered-Sunset-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-TeamFortress2.user.css" style="color: #38ac16;">SteamStat.us-Re-Remastered-TeamFortress2.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-The-Crew-Motorfest.user.css" style="color: #e38998;">SteamStat.us-Re-Remastered-The-Crew-Motorfest.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-TourDeFrance.user.css" style="color: #6ce642;">SteamStat.us-Re-Remastered-TourDeFrance.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-USA-Style.user.css" style="color: #2cf672;">SteamStat.us-Re-Remastered-USA-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Windows95.user.css" style="color: #a377eb;">SteamStat.us-Re-Remastered-Windows95.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Witcher3.user.css" style="color: #28bfde;">SteamStat.us-Re-Remastered-Witcher3.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Wolverines-Style.user.css" style="color: #38c3ed;">SteamStat.us-Re-Remastered-Wolverines-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-WorldOfWarcraft.user.css" style="color: #a0c6d2;">SteamStat.us-Re-Remastered-WorldOfWarcraft.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Zwift.user.css" style="color: #45a3e1;">SteamStat.us-Re-Remastered-Zwift.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered.user.css" style="color: #2fda4b;">SteamStat.us-Re-Remastered.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamTradeMatcher-DarkMode.user.css" style="color: #aeb3b4;">SteamTradeMatcher-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StepSecurityDarkMode.user.css" style="color: #2baf78;">StepSecurityDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaAutoDarkTheme.user.css" style="color: #5df62a;">StravaAutoDarkTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaStratTracker-DarkMode.user.css" style="color: #be8773;">StravaStratTracker-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StreamingSitesStreamsBlackDarkMode.user.css" style="color: #39c63a;">StreamingSitesStreamsBlackDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Stylus-DarkTheme-Updated.user.css" style="color: #4be91c;">Stylus-DarkTheme-Updated.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StylusEditorChromeDark-Fixed.user.css" style="color: #a2d56d;">StylusEditorChromeDark-Fixed.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StylusFluent-Updated.user.css" style="color: #24a9f9;">StylusFluent-Updated.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TamperMonkey-DarkGreen.user.css" style="color: #b4c2cd;">TamperMonkey-DarkGreen.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TamperMonkey-DarkMode.user.css" style="color: #7cd297;">TamperMonkey-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TeamFortressWIki-Dark.user.css" style="color: #f48f1f;">TeamFortressWIki-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TechPowerUp-DarkMode.user.css" style="color: #afae2b;">TechPowerUp-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TrainingPeaks-DarkMode.user.css" style="color: #56ac06;">TrainingPeaks-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UPS.com-DarkMode.user.css" style="color: #5cc83f;">UPS.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Unroll.me-DarkMode.user.css" style="color: #9b952b;">Unroll.me-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UptimeRobotDark.user.css" style="color: #9dc08c;">UptimeRobotDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserStyle-Root-ColorTemplate.user.css" style="color: #92c886;">UserStyle-Root-ColorTemplate.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserscriptTemplate.user.css" style="color: #2caff0;">UserscriptTemplate.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserscriptZone-Dark.user.css" style="color: #e95ff4;">UserscriptZone-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserstyleWorld-DarkBamaBraves.user.css" style="color: #8dcae6;">UserstyleWorld-DarkBamaBraves.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/VisualStudioCode-DarkMode.user.css" style="color: #f96bbf;">VisualStudioCode-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/WahooFitnessDarkMode.user.css" style="color: #a5a0be;">WahooFitnessDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Walmart.com-DarkMode.user.css" style="color: #4ad243;">Walmart.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wanderer-Dark.user.css" style="color: #d765d3;">Wanderer-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Weather.com-DarkMode.user.css" style="color: #d6b264;">Weather.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/WebHint-Dark.user.css" style="color: #50cb19;">WebHint-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wigle-DarkMode-Beta.user.css" style="color: #aa9a34;">Wigle-DarkMode-Beta.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wigle-DarkMode.user.css" style="color: #fab1a1;">Wigle-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wikipedia-OLED-SettingsPage.user.css" style="color: #f08de3;">Wikipedia-OLED-SettingsPage.user.css</a></li></ul>`;
                    break;
                case 'file-list-5':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Windy-DarkMode.user.css" style="color: #a3b77c;">Windy-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YT-Vibra.user.css" style="color: #89cde7;">YT-Vibra.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeRainbowProgress.user.css" style="color: #e09497;">YoutubeRainbowProgress.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeScrubberColors.user.css" style="color: #cd920a;">YoutubeScrubberColors.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeTV-BlackMode.user.css" style="color: #5c889b;">YoutubeTV-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Zwift.com-Dark-Mode.user.css" style="color: #cfc6b9;">Zwift.com-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwiftHacks-DarkMode.user.css" style="color: #39ee0c;">ZwiftHacks-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwiftInsiderDarkMode.user.css" style="color: #4beb14;">ZwiftInsiderDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwiftPower.comDark%20Mode.user.css" style="color: #b4d302;">ZwiftPower.comDark Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Zwiftalizer.com-Darker-Mode.user.css" style="color: #53d971;">Zwiftalizer.com-Darker-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwifterBikesDarkMode.user.css" style="color: #4bdd4a;">ZwifterBikesDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/abcnews.go.com-DarkMode.user.css" style="color: #a9b31d;">abcnews.go.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/bicycling-DarkMode.user.css" style="color: #d766a1;">bicycling-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/detroitmi.gov-DarkMode.user.css" style="color: #acdf03;">detroitmi.gov-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ebay-Dark-Mode.user.css" style="color: #e87955;">ebay-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/findthatride-darkmode.user.css" style="color: #9db270;">findthatride-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/fitfiletools-darkmode.user.css" style="color: #98b332;">fitfiletools-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/fivethirtyeight.comDarkMode.user.css" style="color: #6ab605;">fivethirtyeight.comDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/jalopnik.com-DarkMode.user.css" style="color: #30be81;">jalopnik.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/kom.club-darkmode.user.css" style="color: #b2d44a;">kom.club-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/makinolo.com-Dark-Mode.user.css" style="color: #3bf921;">makinolo.com-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/michigan.gov-DarkMode.user.css" style="color: #22dbc9;">michigan.gov-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/mywindsock-darkmode.user.css" style="color: #60c1fd;">mywindsock-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/nbcwashington.com-DarkMode.user.css" style="color: #ff7f11;">nbcwashington.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/nytimes.com-DarkModeSimple.user.css" style="color: #d578ee;">nytimes.com-DarkModeSimple.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/p337info-tf2.user.css" style="color: #37ed54;">p337info-tf2.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/runalyze-darkmode.user.css" style="color: #699f45;">runalyze-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/stravatoolbox-darkmode.user.css" style="color: #75e808;">stravatoolbox-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/veloviewer-darkmode.user.css" style="color: #31a272;">veloviewer-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/zwifthub.com-darkmode.user.css" style="color: #e2852c;">zwifthub.com-darkmode.user.css</a></li>
<h2 style="color: #abc008;">Userscripts</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/AscentDescentMetersToFeet.user.js" style="color: #a2818c;">AscentDescentMetersToFeet.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/AutoMergeDependabotPRs.user.js" style="color: #f16e01;">AutoMergeDependabotPRs.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/DeleteYoutubePlaylists.user.js" style="color: #bfb4a7;">DeleteYoutubePlaylists.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnhanceYouTubeProfilePictures.user.js" style="color: #b97182;">EnhanceYouTubeProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnlargeKiwifarmsProfilePictures.user.js" style="color: #9ad3c8;">EnlargeKiwifarmsProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnlargeYouTubeChatProfilePictures.user.js" style="color: #71c231;">EnlargeYouTubeChatProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnlargeYouTubeCommentSectionProfilePictures.user.js" style="color: #d4c427;">EnlargeYouTubeCommentSectionProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GOTOESFitFileEditor-AutoClosePopup.user.js" style="color: #9fa085;">GOTOESFitFileEditor-AutoClosePopup.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminConnectRemoveGear.user.js" style="color: #45d3f5;">GarminConnectRemoveGear.user.js</a></li></ul>`;
                    break;
                case 'file-list-6':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GithubMarkMergedDone.user.js" style="color: #7cd18e;">GithubMarkMergedDone.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GyazoDirectLink.user.js" style="color: #a8b1a5;">GyazoDirectLink.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/HideChineseUserstyles.user.js" style="color: #6ba57d;">HideChineseUserstyles.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/HideNon-EnglishUserstyles.user.js" style="color: #f86e17;">HideNon-EnglishUserstyles.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/KudoAll-Strava-Garmin.user.js" style="color: #99860b;">KudoAll-Strava-Garmin.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MergeDependabotPRs.user.js" style="color: #63dff9;">MergeDependabotPRs.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWikiAuto-Categorizer-SlowMode.user.js" style="color: #c4cc29;">OSRSWikiAuto-Categorizer-SlowMode.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWikiAuto-Categorizer.user.js" style="color: #86c0bd;">OSRSWikiAuto-Categorizer.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWikiAuto-Navbox-SlowMode.user.js" style="color: #e697ee;">OSRSWikiAuto-Navbox-SlowMode.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-API-Key-Version-Reddit-Only-Version.user.js" style="color: #d0d241;">OldRedditNewProfilePictures-API-Key-Version-Reddit-Only-Version.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-API-Key-Version-Reddit-Stream-Version.user.js" style="color: #6cb0df;">OldRedditNewProfilePictures-API-Key-Version-Reddit-Stream-Version.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-API-Key-Version.user.js" style="color: #59b162;">OldRedditNewProfilePictures-API-Key-Version.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-UniversalVersion.user.js" style="color: #4bc7bb;">OldRedditNewProfilePictures-UniversalVersion.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures.user.js" style="color: #cecb5a;">OldRedditNewProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures/Old%20Reddit%20with%20New%20Profile%20Pictures.user.js" style="color: #65c290;">OldRedditNewProfilePictures/Old Reddit with New Profile Pictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RedditStreamAutoRefresher.user.js" style="color: #76bf99;">RedditStreamAutoRefresher.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RedditStreamAutoRefresherFaster.user.js" style="color: #65975b;">RedditStreamAutoRefresherFaster.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RightClickEnable.user.js" style="color: #44ba26;">RightClickEnable.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaAutoAuthorize.user.js" style="color: #b6ab26;">StravaAutoAuthorize.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaTextAuto-Selector.user.js" style="color: #37a4d8;">StravaTextAuto-Selector.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SuperchargedLocalDirectoryWebUI.user.js" style="color: #64c1a7;">SuperchargedLocalDirectoryWebUI.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserstyleWorld-SyncStyles.user.js" style="color: #36aeba;">UserstyleWorld-SyncStyles.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTV-Volume-Rememberer.user.js" style="color: #7cb4fa;">YouTubeTV-Volume-Rememberer.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl.user.js" style="color: #f88dfc;">YouTubeTVVolumeControl.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl.user.js" style="color: #e2a1e5;">YouTubeVolumeControl.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeVolumeDisplay.user.js" style="color: #9fdf1a;">YoutubeVolumeDisplay.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Zwift-Give-RideOns-to-Everyone.user.js" style="color: #7a85a2;">Zwift-Give-RideOns-to-Everyone.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/reddit-stream-Enhancements.user.js" style="color: #d0d22d;">reddit-stream-Enhancements.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-Add-Balance-Original.user.js" style="color: #7cae1a;">strava-balance/Strava-Add-Balance-Original.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-Add-Balance-Updated.user.js" style="color: #b597c2;">strava-balance/Strava-Add-Balance-Updated.user.js</a></li>
<h2 style="color: #91ac2b;">CSS</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Discord-Dark%2B-Default-Member-List.css" style="color: #b2b5ae;">Discord-Dark+-Default-Member-List.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/styles.css" style="color: #47b71a;">YouTubeVolumeControl/styles.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.css" style="color: #e09ad1;">codemirror.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.min.css" style="color: #b7966e;">codemirror.min.css</a></li>
<h2 style="color: #f69e29;">JavaScript</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.eslintrc.js" style="color: #5fd6c6;">.eslintrc.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/background.js" style="color: #b77889;">SteamCookieExtractor2/background.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/content.js" style="color: #b38fa5;">SteamCookieExtractor2/content.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/options.js" style="color: #58d2ac;">SteamCookieExtractor2/options.js</a></li></ul>`;
                    break;
                case 'file-list-7':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/popup.js" style="color: #e3855a;">SteamCookieExtractor2/popup.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/WIndyPlugin.min.js" style="color: #a9a555;">WIndyPlugin.min.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/background.js" style="color: #76dced;">YouTubeTVVolumeControl/background.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/content.js" style="color: #d2bd0c;">YouTubeTVVolumeControl/content.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/background.js" style="color: #98cdb7;">YouTubeVolumeControl/background.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/content.js" style="color: #8ec943;">YouTubeVolumeControl/content.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify-css-mod.js" style="color: #33bbfc;">beautify-css-mod.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify.js" style="color: #32e56e;">beautify.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.js" style="color: #2b92d1;">codemirror.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.min.js" style="color: #94a41d;">codemirror.min.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/convertHexToRgba.js" style="color: #d4ac1d;">convertHexToRgba.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/css.js" style="color: #40e676;">css.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/css.min.js" style="color: #74c86c;">css.min.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/cyclingCalculators.js" style="color: #2ddffb;">cyclingCalculators.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-AddBalance-Updated.js" style="color: #ae8de2;">strava-balance/Strava-AddBalance-Updated.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-AddBalance.js" style="color: #b4b2ba;">strava-balance/Strava-AddBalance.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/binary-Updated.js" style="color: #d2b40e;">strava-balance/binary-Updated.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/binary.js" style="color: #4baeb0;">strava-balance/binary.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/buffer-5.6.1/base64-js-1.3.1/index.js" style="color: #5a9fb4;">strava-balance/buffer-5.6.1/base64-js-1.3.1/index.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/buffer-5.6.1/ieee754-1.1.13/index.js" style="color: #2ee9cd;">strava-balance/buffer-5.6.1/ieee754-1.1.13/index.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/buffer-5.6.1/index.js" style="color: #9eaeab;">strava-balance/buffer-5.6.1/index.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/fit-parser-Updated.js" style="color: #9b967c;">strava-balance/fit-parser-Updated.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/fit-parser.js" style="color: #60d428;">strava-balance/fit-parser.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/fit.js" style="color: #36e6ac;">strava-balance/fit.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/messages.js" style="color: #9d823d;">strava-balance/messages.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/strava-fit-parser.js" style="color: #49e90a;">strava-balance/strava-fit-parser.js</a></li>
<h2 style="color: #ed62f4;">YAML</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/dependabot.yml" style="color: #6fba8d;">.github/dependabot.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/labeler.yml" style="color: #6f9e41;">.github/labeler.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/ActionLint.yml" style="color: #bc8a5e;">.github/workflows/ActionLint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/Bandit.yml" style="color: #3bf43f;">.github/workflows/Bandit.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/Snake.yml" style="color: #4196a4;">.github/workflows/Snake.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/black-formatter.yml" style="color: #bec6ed;">.github/workflows/black-formatter.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/codeql.yml" style="color: #e29527;">.github/workflows/codeql.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/defender.yml" style="color: #d19fae;">.github/workflows/defender.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/deno.yml" style="color: #e2797c;">.github/workflows/deno.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/dependency-review.yml" style="color: #86abc4;">.github/workflows/dependency-review.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/devskim.yml" style="color: #2bed4b;">.github/workflows/devskim.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/eslint.yml" style="color: #d4a756;">.github/workflows/eslint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/generate-file-list.yml" style="color: #808e17;">.github/workflows/generate-file-list.yml</a></li></ul>`;
                    break;
                case 'file-list-8':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/greetings.yml" style="color: #97c77d;">.github/workflows/greetings.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/label.yml" style="color: #5c9348;">.github/workflows/label.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/ossar.yml" style="color: #c7933e;">.github/workflows/ossar.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/osv-scanner.yml" style="color: #e29ff6;">.github/workflows/osv-scanner.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/scorecards.yml" style="color: #90e06f;">.github/workflows/scorecards.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/semgrep.yml" style="color: #85a877;">.github/workflows/semgrep.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/sitemap.yml" style="color: #83c35d;">.github/workflows/sitemap.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/sobelow.yml" style="color: #cea670;">.github/workflows/sobelow.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/stale.yml" style="color: #e46db9;">.github/workflows/stale.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/static.yml" style="color: #3ac184;">.github/workflows/static.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/stylelint.yml" style="color: #e89a00;">.github/workflows/stylelint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/super-linter.yml" style="color: #718e6a;">.github/workflows/super-linter.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.markdownlint.yml" style="color: #43b154;">.markdownlint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.scss-lint.yml" style="color: #76afd6;">.scss-lint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/_config.yml" style="color: #9ad330;">_config.yml</a></li>
<h2 style="color: #65d1e3;">.github/PULL_REQUEST_TEMPLATE</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/PULL_REQUEST_TEMPLATE/pull_request_template.md" style="color: #a4a04c;">.github/PULL_REQUEST_TEMPLATE/pull_request_template.md</a></li>
<h2 style="color: #4bdc04;">.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/bug_report.md" style="color: #6bec4d;">.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/bug_report.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/feature_request.md" style="color: #36d607;">.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/feature_request.md</a></li>
<h2 style="color: #e499c5;">.vscode</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/generate_file_list.py" style="color: #269afa;">.vscode/generate_file_list.py</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/launch.json" style="color: #31c560;">.vscode/launch.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/settings.json" style="color: #53c1ef;">.vscode/settings.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/tasks.json" style="color: #d99856;">.vscode/tasks.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/test_generate_file_list.py" style="color: #dd6afc;">.vscode/test_generate_file_list.py</a></li>
<h2 style="color: #28ef42;">OldRedditNewProfilePictures</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures/Old%20Reddit%20with%20New%20Profile%20Pictures.options.json" style="color: #66da7e;">OldRedditNewProfilePictures/Old Reddit with New Profile Pictures.options.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures/Old%20Reddit%20with%20New%20Profile%20Pictures.storage.json" style="color: #8edf0c;">OldRedditNewProfilePictures/Old Reddit with New Profile Pictures.storage.json</a></li>
<h2 style="color: #acac6f;">SteamCookieExtractor2</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/manifest.json" style="color: #df9a28;">SteamCookieExtractor2/manifest.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/options.html" style="color: #74c0e4;">SteamCookieExtractor2/options.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/popup.html" style="color: #a990bd;">SteamCookieExtractor2/popup.html</a></li>
<h2 style="color: #449cb3;">SteamCookieExtractor2/icons</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/icon128.png" style="color: #e7ad69;">SteamCookieExtractor2/icons/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/icon16.png" style="color: #dbab03;">SteamCookieExtractor2/icons/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/icon48.png" style="color: #d48ef1;">SteamCookieExtractor2/icons/icon48.png</a></li>
<h2 style="color: #e0c91f;">SteamCookieExtractor2/icons/images</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/images/icon128.png" style="color: #70ca2a;">SteamCookieExtractor2/icons/images/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/images/icon16.png" style="color: #83ad66;">SteamCookieExtractor2/icons/images/icon16.png</a></li></ul>`;
                    break;
                case 'file-list-9':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/images/icon48.png" style="color: #3fdbde;">SteamCookieExtractor2/icons/images/icon48.png</a></li>
<h2 style="color: #9bd5c3;">YouTubeTVVolumeControl</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/icon128.png" style="color: #899431;">YouTubeTVVolumeControl/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/icon16.png" style="color: #82996a;">YouTubeTVVolumeControl/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/icon48.png" style="color: #8abfa8;">YouTubeTVVolumeControl/icon48.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/manifest.json" style="color: #27e106;">YouTubeTVVolumeControl/manifest.json</a></li>
<h2 style="color: #89b615;">YouTubeVolumeControl</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icon128.png" style="color: #ec7f68;">YouTubeVolumeControl/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icon16.png" style="color: #c69e22;">YouTubeVolumeControl/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icon48.png" style="color: #77ba4c;">YouTubeVolumeControl/icon48.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/manifest.json" style="color: #75c8ab;">YouTubeVolumeControl/manifest.json</a></li>
<h2 style="color: #5b9d63;">YouTubeVolumeControl/icons</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/icon128.png" style="color: #a272b9;">YouTubeVolumeControl/icons/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/icon16.png" style="color: #3fd982;">YouTubeVolumeControl/icons/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/icon48.png" style="color: #95a16f;">YouTubeVolumeControl/icons/icon48.png</a></li>
<h2 style="color: #74b162;">YouTubeVolumeControl/icons/images</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/images/icon128.png" style="color: #28da87;">YouTubeVolumeControl/icons/images/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/images/icon16.png" style="color: #ba72d4;">YouTubeVolumeControl/icons/images/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/images/icon48.png" style="color: #4ed0bf;">YouTubeVolumeControl/icons/images/icon48.png</a></li>
<h2 style="color: #eea995;">assets</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-city-background.png" style="color: #4bc513;">assets/kiwi-city-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-default-background.png" style="color: #efb6c3;">assets/kiwi-default-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-flower-background.png" style="color: #2ec1d5;">assets/kiwi-flower-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-green-background.png" style="color: #8fb958;">assets/kiwi-green-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-purple-background.png" style="color: #c5c7ae;">assets/kiwi-purple-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-space-apple-background.png" style="color: #5bbe16;">assets/kiwi-space-apple-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-swirls-background.png" style="color: #b572a5;">assets/kiwi-swirls-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-trees-background.png" style="color: #62ea82;">assets/kiwi-trees-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-vaporwave-logo.png" style="color: #d6b31a;">assets/kiwi-vaporwave-logo.png</a></li>
<h2 style="color: #53f62a;">src</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/src/generate_file_list.py" style="color: #ee65c2;">src/generate_file_list.py</a></li></ul>`;
                    break;
            }
            placeholder.innerHTML = file_list_html;
        });
    }
});
</script>
