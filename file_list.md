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
                            file_list_html = `<ul><h2 style="color: #7fa38b;">Repo Root</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.black" style="color: #28b199;">.black</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.copilot-instructions.md" style="color: #b8cd94;">.copilot-instructions.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.editorconfig" style="color: #fa59dc;">.editorconfig</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.gitignore" style="color: #8fd77e;">.gitignore</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.gitleaksignore" style="color: #84d9dc;">.gitleaksignore</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.hintrc" style="color: #eebd2c;">.hintrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.jsbeautifyrc" style="color: #82a457;">.jsbeautifyrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.jscsrc" style="color: #23ca2d;">.jscsrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.npmrc" style="color: #2cfc6f;">.npmrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.pre-commit-config.yaml" style="color: #f45ff5;">.pre-commit-config.yaml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.pre-commit-hooks.yaml" style="color: #bd89af;">.pre-commit-hooks.yaml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierignore" style="color: #9d7ef4;">.prettierignore</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierrc" style="color: #28de65;">.prettierrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierrc.noplugins" style="color: #c87650;">.prettierrc.noplugins</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierrc.temp" style="color: #2ce040;">.prettierrc.temp</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.stylelintrc.json" style="color: #a7b47d;">.stylelintrc.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vale.ini" style="color: #ab9493;">.vale.ini</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CNAME" style="color: #50b02c;">CNAME</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CODE_OF_CONDUCT.md" style="color: #a6d772;">CODE_OF_CONDUCT.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CONTRIBUTING.md" style="color: #81d32e;">CONTRIBUTING.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Gemfile" style="color: #b3c758;">Gemfile</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Gemfile.lock" style="color: #b4ac25;">Gemfile.lock</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/KudoAll-Strava-Garmin.user.test.cjs" style="color: #3fe5b7;">KudoAll-Strava-Garmin.user.test.cjs</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/LICENSE" style="color: #70c884;">LICENSE</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Microsoft.PowerShell_profile.ps1" style="color: #5deb55;">Microsoft.PowerShell_profile.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures.html" style="color: #22dc7a;">OldRedditNewProfilePictures.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PrettierFormatExcludePreprocessor.ps1" style="color: #e0ab2c;">PrettierFormatExcludePreprocessor.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/README.md" style="color: #a79697;">README.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SECURITY.md" style="color: #35ef83;">SECURITY.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify-local.html" style="color: #79b0d2;">beautify-local.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify.html" style="color: #60b273;">beautify.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/convertHexToRgba.html" style="color: #849090;">convertHexToRgba.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/cyclingCalculators.html" style="color: #3cd475;">cyclingCalculators.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/deno.json" style="color: #2fe269;">deno.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/deno.lock" style="color: #54d903;">deno.lock</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/eslint.config.mjs" style="color: #db77fc;">eslint.config.mjs</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/favicon.ico" style="color: #9f75da;">favicon.ico</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/favicon.png" style="color: #83d4f7;">favicon.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/file_list.html" style="color: #309ba3;">file_list.html</a></li></ul>`;
                            break;
                        case 'file-list-2':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/file_list.md" style="color: #74b9a9;">file_list.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/generate_gemfile.rb" style="color: #fda24b;">generate_gemfile.rb</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/jsconfig.json" style="color: #b88e6d;">jsconfig.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/package-lock.json" style="color: #3fd0b8;">package-lock.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/package.json" style="color: #d88722;">package.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/requirements.txt" style="color: #599a59;">requirements.txt</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/robots.txt" style="color: #bd8a20;">robots.txt</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/sitemap.xml" style="color: #8ec8a1;">sitemap.xml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/useragent-switcher-preferences.json" style="color: #ed9e15;">useragent-switcher-preferences.json</a></li>
<h2 style="color: #39e61b;">Userstyles</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/17track.net-DarkMode.user.css" style="color: #66b4e6;">17track.net-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ActivityFixDarkMode.user.css" style="color: #f5a26f;">ActivityFixDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Archive.orgNightTheme%28Updated%29.user.css" style="color: #3ccdb7;">Archive.orgNightTheme(Updated).user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Benjdd-dark.user.css" style="color: #b5b429;">Benjdd-dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CFG.tf-DarkMode.user.css" style="color: #a575f8;">CFG.tf-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CSSGradient-DarkMode.user.css" style="color: #abaa7e;">CSSGradient-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CSSPortal-Dark.user.css" style="color: #e19321;">CSSPortal-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Copilot-Microsoft-Blackmode.user.css" style="color: #8ea44c;">Copilot-Microsoft-Blackmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CrystalMathLabs-BlackMode.user.css" style="color: #d698cf;">CrystalMathLabs-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/DCRainMaker-DarkMode.user.css" style="color: #b98ac8;">DCRainMaker-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Dearrow-RemoveDearrowButton.user.css" style="color: #a59119;">Dearrow-RemoveDearrowButton.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/DeepSeek-DarkMode.user.css" style="color: #4ab2ab;">DeepSeek-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ESPN-DarkMode.user.css" style="color: #5b9c60;">ESPN-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/FandomDark.user.css" style="color: #599d92;">FandomDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Favero-DarkMode.user.css" style="color: #8bc7b2;">Favero-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Fedex.com-DarkMode.user.css" style="color: #c19e7d;">Fedex.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/FitFileViewer-DarkTheme.user.css" style="color: #f793ce;">FitFileViewer-DarkTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/FiveServer-DarkMode.user.css" style="color: #fc79b0;">FiveServer-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GOTOES.org-DarkMode.user.css" style="color: #bd9b7b;">GOTOES.org-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GTBikeV-DarkMode.user.css" style="color: #2ce8f5;">GTBikeV-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminBadges-DarkMode.user.css" style="color: #4ccffe;">GarminBadges-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminConnectDark.user.css" style="color: #b3d56b;">GarminConnectDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminRumors-DarkMode.user.css" style="color: #d267fc;">GarminRumors-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GreasyForkDark.user.css" style="color: #7bca55;">GreasyForkDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Gyazo-DarkMode.user.css" style="color: #48c9ba;">Gyazo-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Kiwifarms-Black.user.css" style="color: #54a376;">Kiwifarms-Black.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Kiwifarms-Halloween.user.css" style="color: #d96c46;">Kiwifarms-Halloween.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Kiwifarms-Vaporwave.user.css" style="color: #45a8ba;">Kiwifarms-Vaporwave.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Klimat.app-DarkMode.user.css" style="color: #dd848e;">Klimat.app-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MarkdownViewer%2B%2BTheme.user.css" style="color: #98ba85;">MarkdownViewer++Theme.user.css</a></li></ul>`;
                            break;
                        case 'file-list-3':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Medicare-Gov-Dark-Mode.user.css" style="color: #37bd47;">Medicare-Gov-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MyBikeTraffic-DarkMode.user.css" style="color: #81d729;">MyBikeTraffic-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MyWorkoutCompanion-Dark.user.css" style="color: #d09332;">MyWorkoutCompanion-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Nascar.com-DarkMode.user.css" style="color: #76dda6;">Nascar.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/NewYorkerDarkMode.user.css" style="color: #cdc406;">NewYorkerDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/NewYorkerSimpleDarkMode.user.css" style="color: #59a0fa;">NewYorkerSimpleDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRS-HiScores-BlackMode.user.css" style="color: #f89994;">OSRS-HiScores-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWorldHeatmap-Dark.user.css" style="color: #39e97b;">OSRSWorldHeatmap-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OsrsWikiDarkMode.user.css" style="color: #359ab5;">OsrsWikiDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Papertrails-DarkMode.user.css" style="color: #deb2ee;">Papertrails-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PathFinderW3School-Dark.user.css" style="color: #e673b6;">PathFinderW3School-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PowerMeter.cc-DarkMode.user.css" style="color: #8ca377;">PowerMeter.cc-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PromptHero-Dark.user.css" style="color: #e58396;">PromptHero-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RedditColoredComments.user.css" style="color: #ce9b73;">RedditColoredComments.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Scrap.tf-BlackTheme.user.css" style="color: #aac7af;">Scrap.tf-BlackTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Skial-CustomTheme.user.css" style="color: #dc6b7c;">Skial-CustomTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SportSurge-BlackMode.user.css" style="color: #31b165;">SportSurge-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SquadRats-Dark.user.css" style="color: #fd859a;">SquadRats-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Statshunters-Dark.user.css" style="color: #34c643;">Statshunters-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamDB-Black-Mode.user.css" style="color: #80e306;">SteamDB-Black-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamDB-Dark-Mode.user.css" style="color: #478dce;">SteamDB-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Brawlhalla.user.css" style="color: #31a25e;">SteamStat.us-Re-Remastered-Brawlhalla.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Christmas-Style.user.css" style="color: #daca32;">SteamStat.us-Re-Remastered-Christmas-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Detroit-Lions-Style.user.css" style="color: #8aec04;">SteamStat.us-Re-Remastered-Detroit-Lions-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Detroit-Tigers.user.css" style="color: #e581c4;">SteamStat.us-Re-Remastered-Detroit-Tigers.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Easter-Style.user.css" style="color: #30c7bf;">SteamStat.us-Re-Remastered-Easter-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Green-BlackStyle.user.css" style="color: #6bb18a;">SteamStat.us-Re-Remastered-Green-BlackStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Halloween-Style.user.css" style="color: #de9589;">SteamStat.us-Re-Remastered-Halloween-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Lime%20Green-Purple%20Style.user.css" style="color: #699583;">SteamStat.us-Re-Remastered-Lime Green-Purple Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Miami-Heat.user.css" style="color: #e6c825;">SteamStat.us-Re-Remastered-Miami-Heat.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-NASCAR.user.css" style="color: #24dd3e;">SteamStat.us-Re-Remastered-NASCAR.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Orange-BlackStyle.user.css" style="color: #8e7aad;">SteamStat.us-Re-Remastered-Orange-BlackStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-PCMasterRace.user.css" style="color: #2aa1d2;">SteamStat.us-Re-Remastered-PCMasterRace.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Pink-BlackStyle.user.css" style="color: #77a1da;">SteamStat.us-Re-Remastered-Pink-BlackStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Purple.user.css" style="color: #a8a1bf;">SteamStat.us-Re-Remastered-Purple.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-RainbowStyle.user.css" style="color: #5ccd13;">SteamStat.us-Re-Remastered-RainbowStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-SteamStyle.user.css" style="color: #56c5a3;">SteamStat.us-Re-Remastered-SteamStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Sunset-Style.user.css" style="color: #bfaf1d;">SteamStat.us-Re-Remastered-Sunset-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-TeamFortress2.user.css" style="color: #33f222;">SteamStat.us-Re-Remastered-TeamFortress2.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-The-Crew-Motorfest.user.css" style="color: #da67ab;">SteamStat.us-Re-Remastered-The-Crew-Motorfest.user.css</a></li></ul>`;
                            break;
                        case 'file-list-4':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-TourDeFrance.user.css" style="color: #40979e;">SteamStat.us-Re-Remastered-TourDeFrance.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-USA-Style.user.css" style="color: #37fb57;">SteamStat.us-Re-Remastered-USA-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Windows95.user.css" style="color: #e580f1;">SteamStat.us-Re-Remastered-Windows95.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Witcher3.user.css" style="color: #f88746;">SteamStat.us-Re-Remastered-Witcher3.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Wolverines-Style.user.css" style="color: #42de73;">SteamStat.us-Re-Remastered-Wolverines-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-WorldOfWarcraft.user.css" style="color: #58b9c4;">SteamStat.us-Re-Remastered-WorldOfWarcraft.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Zwift.user.css" style="color: #7088c5;">SteamStat.us-Re-Remastered-Zwift.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered.user.css" style="color: #e1c14f;">SteamStat.us-Re-Remastered.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamTradeMatcher-DarkMode.user.css" style="color: #a093f8;">SteamTradeMatcher-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StepSecurityDarkMode.user.css" style="color: #f4c919;">StepSecurityDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaAutoDarkTheme.user.css" style="color: #61aed8;">StravaAutoDarkTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaStratTracker-DarkMode.user.css" style="color: #f7b8b3;">StravaStratTracker-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StreamingSitesStreamsBlackDarkMode.user.css" style="color: #b3db10;">StreamingSitesStreamsBlackDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Stylus-DarkTheme-Updated.user.css" style="color: #f5792c;">Stylus-DarkTheme-Updated.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StylusEditorChromeDark-Fixed.user.css" style="color: #ca7d99;">StylusEditorChromeDark-Fixed.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StylusFluent-Updated.user.css" style="color: #efa5aa;">StylusFluent-Updated.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TamperMonkey-DarkGreen.user.css" style="color: #2af806;">TamperMonkey-DarkGreen.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TamperMonkey-DarkMode.user.css" style="color: #3ff0b0;">TamperMonkey-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TeamFortressWIki-Dark.user.css" style="color: #ab8d76;">TeamFortressWIki-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TechPowerUp-DarkMode.user.css" style="color: #71ad56;">TechPowerUp-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TrainingPeaks-DarkMode.user.css" style="color: #dd7bf5;">TrainingPeaks-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UPS.com-DarkMode.user.css" style="color: #97ccab;">UPS.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Unroll.me-DarkMode.user.css" style="color: #8dcc80;">Unroll.me-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UptimeRobotDark.user.css" style="color: #9cd64a;">UptimeRobotDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserStyle-Root-ColorTemplate.user.css" style="color: #9dd29d;">UserStyle-Root-ColorTemplate.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserscriptTemplate.user.css" style="color: #e096e2;">UserscriptTemplate.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserscriptZone-Dark.user.css" style="color: #59a44a;">UserscriptZone-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserstyleWorld-DarkBamaBraves.user.css" style="color: #30c7d9;">UserstyleWorld-DarkBamaBraves.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/VisualStudioCode-DarkMode.user.css" style="color: #68b26d;">VisualStudioCode-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/WahooFitnessDarkMode.user.css" style="color: #27a8d0;">WahooFitnessDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Walmart.com-DarkMode.user.css" style="color: #33eb0e;">Walmart.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wanderer-Dark.user.css" style="color: #abc1ff;">Wanderer-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Weather.com-DarkMode.user.css" style="color: #be944e;">Weather.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/WebHint-Dark.user.css" style="color: #3ed878;">WebHint-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wigle-DarkMode-Beta.user.css" style="color: #9ca929;">Wigle-DarkMode-Beta.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wigle-DarkMode.user.css" style="color: #ea8abc;">Wigle-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wikipedia-OLED-SettingsPage.user.css" style="color: #dea9d5;">Wikipedia-OLED-SettingsPage.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Windy-DarkMode.user.css" style="color: #e3ac0d;">Windy-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YT-Vibra.user.css" style="color: #38edf2;">YT-Vibra.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeRainbowProgress.user.css" style="color: #4bd415;">YoutubeRainbowProgress.user.css</a></li></ul>`;
                            break;
                        case 'file-list-5':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeScrubberColors.user.css" style="color: #de7318;">YoutubeScrubberColors.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeTV-BlackMode.user.css" style="color: #7b9bd6;">YoutubeTV-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Zwift.com-Dark-Mode.user.css" style="color: #8bc872;">Zwift.com-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwiftHacks-DarkMode.user.css" style="color: #4b997c;">ZwiftHacks-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwiftInsiderDarkMode.user.css" style="color: #d6a4db;">ZwiftInsiderDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwiftPower.comDark%20Mode.user.css" style="color: #83aff0;">ZwiftPower.comDark Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Zwiftalizer.com-Darker-Mode.user.css" style="color: #dcc513;">Zwiftalizer.com-Darker-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwifterBikesDarkMode.user.css" style="color: #e16760;">ZwifterBikesDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/abcnews.go.com-DarkMode.user.css" style="color: #a29272;">abcnews.go.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/bicycling-DarkMode.user.css" style="color: #36c31c;">bicycling-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/detroitmi.gov-DarkMode.user.css" style="color: #40efa4;">detroitmi.gov-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ebay-Dark-Mode.user.css" style="color: #638cd0;">ebay-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/findthatride-darkmode.user.css" style="color: #2aed62;">findthatride-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/fitfiletools-darkmode.user.css" style="color: #31e7d8;">fitfiletools-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/fivethirtyeight.comDarkMode.user.css" style="color: #36ac0a;">fivethirtyeight.comDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/jalopnik.com-DarkMode.user.css" style="color: #b8dc12;">jalopnik.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/kom.club-darkmode.user.css" style="color: #f97738;">kom.club-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/makinolo.com-Dark-Mode.user.css" style="color: #2eb081;">makinolo.com-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/michigan.gov-DarkMode.user.css" style="color: #4ebaad;">michigan.gov-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/mywindsock-darkmode.user.css" style="color: #5dda1b;">mywindsock-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/nbcwashington.com-DarkMode.user.css" style="color: #698ef4;">nbcwashington.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/nytimes.com-DarkModeSimple.user.css" style="color: #d28330;">nytimes.com-DarkModeSimple.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/p337info-tf2.user.css" style="color: #84b5ee;">p337info-tf2.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/runalyze-darkmode.user.css" style="color: #f87587;">runalyze-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/stravatoolbox-darkmode.user.css" style="color: #7aa62c;">stravatoolbox-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/veloviewer-darkmode.user.css" style="color: #40f70c;">veloviewer-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/zwifthub.com-darkmode.user.css" style="color: #f38d9d;">zwifthub.com-darkmode.user.css</a></li>
<h2 style="color: #2bcbe2;">Userscripts</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/AscentDescentMetersToFeet.user.js" style="color: #d0aa27;">AscentDescentMetersToFeet.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/AutoMergeDependabotPRs.user.js" style="color: #9771ed;">AutoMergeDependabotPRs.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/DeleteYoutubePlaylists.user.js" style="color: #9ae20f;">DeleteYoutubePlaylists.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnhanceYouTubeProfilePictures.user.js" style="color: #73aa31;">EnhanceYouTubeProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnlargeKiwifarmsProfilePictures.user.js" style="color: #bccb16;">EnlargeKiwifarmsProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnlargeYouTubeChatProfilePictures.user.js" style="color: #45c192;">EnlargeYouTubeChatProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnlargeYouTubeCommentSectionProfilePictures.user.js" style="color: #adb7cf;">EnlargeYouTubeCommentSectionProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GOTOESFitFileEditor-AutoClosePopup.user.js" style="color: #67949a;">GOTOESFitFileEditor-AutoClosePopup.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminConnectRemoveGear.user.js" style="color: #8ab7cb;">GarminConnectRemoveGear.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GithubMarkMergedDone.user.js" style="color: #e49567;">GithubMarkMergedDone.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GyazoDirectLink.user.js" style="color: #6d9637;">GyazoDirectLink.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/HideChineseUserstyles.user.js" style="color: #9f94d7;">HideChineseUserstyles.user.js</a></li></ul>`;
                            break;
                        case 'file-list-6':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/HideNon-EnglishUserstyles.user.js" style="color: #9ccce0;">HideNon-EnglishUserstyles.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/KudoAll-Strava-Garmin.user.js" style="color: #8392e1;">KudoAll-Strava-Garmin.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MergeDependabotPRs.user.js" style="color: #f08926;">MergeDependabotPRs.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWikiAuto-Categorizer-SlowMode.user.js" style="color: #7ad1ed;">OSRSWikiAuto-Categorizer-SlowMode.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWikiAuto-Categorizer.user.js" style="color: #fe53e9;">OSRSWikiAuto-Categorizer.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWikiAuto-Navbox-SlowMode.user.js" style="color: #bb7568;">OSRSWikiAuto-Navbox-SlowMode.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-API-Key-Version-Reddit-Only-Version.user.js" style="color: #e07eb3;">OldRedditNewProfilePictures-API-Key-Version-Reddit-Only-Version.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-API-Key-Version-Reddit-Stream-Version.user.js" style="color: #80cc0f;">OldRedditNewProfilePictures-API-Key-Version-Reddit-Stream-Version.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-API-Key-Version.user.js" style="color: #4ba01a;">OldRedditNewProfilePictures-API-Key-Version.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-UniversalVersion.user.js" style="color: #fcb801;">OldRedditNewProfilePictures-UniversalVersion.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures.user.js" style="color: #4c89cf;">OldRedditNewProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures/Old%20Reddit%20with%20New%20Profile%20Pictures.user.js" style="color: #fe7a2c;">OldRedditNewProfilePictures/Old Reddit with New Profile Pictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RedditStreamAutoRefresher.user.js" style="color: #8a92f1;">RedditStreamAutoRefresher.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RedditStreamAutoRefresherFaster.user.js" style="color: #6d9885;">RedditStreamAutoRefresherFaster.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RightClickEnable.user.js" style="color: #8dbe60;">RightClickEnable.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaAutoAuthorize.user.js" style="color: #b59468;">StravaAutoAuthorize.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaTextAuto-Selector.user.js" style="color: #cab6b7;">StravaTextAuto-Selector.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SuperchargedLocalDirectoryWebUI.user.js" style="color: #88b9ab;">SuperchargedLocalDirectoryWebUI.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserstyleWorld-SyncStyles.user.js" style="color: #899498;">UserstyleWorld-SyncStyles.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTV-Volume-Rememberer.user.js" style="color: #41caad;">YouTubeTV-Volume-Rememberer.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl.user.js" style="color: #ccb360;">YouTubeTVVolumeControl.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl.user.js" style="color: #e8a3bf;">YouTubeVolumeControl.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeVolumeDisplay.user.js" style="color: #3bd254;">YoutubeVolumeDisplay.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Zwift-Give-RideOns-to-Everyone.user.js" style="color: #fc9953;">Zwift-Give-RideOns-to-Everyone.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/reddit-stream-Enhancements.user.js" style="color: #ea63a9;">reddit-stream-Enhancements.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-Add-Balance-Original.user.js" style="color: #f55fb9;">strava-balance/Strava-Add-Balance-Original.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-Add-Balance-Updated.user.js" style="color: #eb659b;">strava-balance/Strava-Add-Balance-Updated.user.js</a></li>
<h2 style="color: #ae87ac;">CSS</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Discord-Dark%2B-Default-Member-List.css" style="color: #5cf011;">Discord-Dark+-Default-Member-List.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/styles.css" style="color: #d797a1;">YouTubeVolumeControl/styles.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.css" style="color: #6de449;">codemirror.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.min.css" style="color: #2db5e9;">codemirror.min.css</a></li>
<h2 style="color: #5dc827;">JavaScript</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.eslintrc.js" style="color: #ff9aad;">.eslintrc.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/background.js" style="color: #8b9721;">SteamCookieExtractor2/background.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/content.js" style="color: #77d689;">SteamCookieExtractor2/content.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/options.js" style="color: #b6b59f;">SteamCookieExtractor2/options.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/popup.js" style="color: #30a170;">SteamCookieExtractor2/popup.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/WIndyPlugin.min.js" style="color: #33c15d;">WIndyPlugin.min.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/background.js" style="color: #d682d2;">YouTubeTVVolumeControl/background.js</a></li></ul>`;
                            break;
                        case 'file-list-7':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/content.js" style="color: #cfc724;">YouTubeTVVolumeControl/content.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/background.js" style="color: #4eae6e;">YouTubeVolumeControl/background.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/content.js" style="color: #e39908;">YouTubeVolumeControl/content.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify-css-mod.js" style="color: #5e8c7f;">beautify-css-mod.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify.js" style="color: #ef78b0;">beautify.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.js" style="color: #ef85e7;">codemirror.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.min.js" style="color: #da75a9;">codemirror.min.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/convertHexToRgba.js" style="color: #bbc999;">convertHexToRgba.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/css.js" style="color: #cdc474;">css.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/css.min.js" style="color: #27a8d4;">css.min.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/cyclingCalculators.js" style="color: #3daaee;">cyclingCalculators.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-AddBalance-Updated.js" style="color: #ba817d;">strava-balance/Strava-AddBalance-Updated.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-AddBalance.js" style="color: #f094dd;">strava-balance/Strava-AddBalance.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/binary-Updated.js" style="color: #57cdf1;">strava-balance/binary-Updated.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/binary.js" style="color: #77c11f;">strava-balance/binary.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/buffer-5.6.1/base64-js-1.3.1/index.js" style="color: #2ca681;">strava-balance/buffer-5.6.1/base64-js-1.3.1/index.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/buffer-5.6.1/ieee754-1.1.13/index.js" style="color: #b2824e;">strava-balance/buffer-5.6.1/ieee754-1.1.13/index.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/buffer-5.6.1/index.js" style="color: #32cf95;">strava-balance/buffer-5.6.1/index.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/fit-parser-Updated.js" style="color: #74c449;">strava-balance/fit-parser-Updated.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/fit-parser.js" style="color: #23c089;">strava-balance/fit-parser.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/fit.js" style="color: #e9739b;">strava-balance/fit.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/messages.js" style="color: #879c2f;">strava-balance/messages.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/strava-fit-parser.js" style="color: #fe687f;">strava-balance/strava-fit-parser.js</a></li>
<h2 style="color: #23b05f;">YAML</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/dependabot.yml" style="color: #db730c;">.github/dependabot.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/labeler.yml" style="color: #a5a3cb;">.github/labeler.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/ActionLint.yml" style="color: #9491ca;">.github/workflows/ActionLint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/Bandit.yml" style="color: #f66686;">.github/workflows/Bandit.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/Snake.yml" style="color: #70bd09;">.github/workflows/Snake.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/black-formatter.yml" style="color: #bfc891;">.github/workflows/black-formatter.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/codeql.yml" style="color: #64cafa;">.github/workflows/codeql.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/defender.yml" style="color: #8ba9da;">.github/workflows/defender.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/deno.yml" style="color: #73a795;">.github/workflows/deno.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/dependency-review.yml" style="color: #60ac20;">.github/workflows/dependency-review.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/devskim.yml" style="color: #e0c319;">.github/workflows/devskim.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/eslint.yml" style="color: #6285b8;">.github/workflows/eslint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/generate-file-list.yml" style="color: #93ae50;">.github/workflows/generate-file-list.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/greetings.yml" style="color: #5ed6e0;">.github/workflows/greetings.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/label.yml" style="color: #62c63c;">.github/workflows/label.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/ossar.yml" style="color: #d0b3c3;">.github/workflows/ossar.yml</a></li></ul>`;
                            break;
                        case 'file-list-8':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/osv-scanner.yml" style="color: #60e785;">.github/workflows/osv-scanner.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/scorecards.yml" style="color: #f583b4;">.github/workflows/scorecards.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/semgrep.yml" style="color: #a292e4;">.github/workflows/semgrep.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/sitemap.yml" style="color: #faa514;">.github/workflows/sitemap.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/sobelow.yml" style="color: #2bb3ca;">.github/workflows/sobelow.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/stale.yml" style="color: #549b95;">.github/workflows/stale.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/static.yml" style="color: #d9941b;">.github/workflows/static.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/stylelint.yml" style="color: #f3862a;">.github/workflows/stylelint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/super-linter.yml" style="color: #e4c222;">.github/workflows/super-linter.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.markdownlint.yml" style="color: #c7bd57;">.markdownlint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.scss-lint.yml" style="color: #9cb649;">.scss-lint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/_config.yml" style="color: #39dd42;">_config.yml</a></li>
<h2 style="color: #e0acf0;">.github/PULL_REQUEST_TEMPLATE</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/PULL_REQUEST_TEMPLATE/pull_request_template.md" style="color: #8ea815;">.github/PULL_REQUEST_TEMPLATE/pull_request_template.md</a></li>
<h2 style="color: #3998fd;">.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/bug_report.md" style="color: #cf9737;">.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/bug_report.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/feature_request.md" style="color: #b4ad81;">.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/feature_request.md</a></li>
<h2 style="color: #e38b35;">.vscode</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/generate_file_list.py" style="color: #e8c83d;">.vscode/generate_file_list.py</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/launch.json" style="color: #b2b1ed;">.vscode/launch.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/settings.json" style="color: #67b9cc;">.vscode/settings.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/tasks.json" style="color: #d47a49;">.vscode/tasks.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/test_generate_file_list.py" style="color: #c3b003;">.vscode/test_generate_file_list.py</a></li>
<h2 style="color: #41b75c;">OldRedditNewProfilePictures</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures/Old%20Reddit%20with%20New%20Profile%20Pictures.options.json" style="color: #69b194;">OldRedditNewProfilePictures/Old Reddit with New Profile Pictures.options.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures/Old%20Reddit%20with%20New%20Profile%20Pictures.storage.json" style="color: #98ba48;">OldRedditNewProfilePictures/Old Reddit with New Profile Pictures.storage.json</a></li>
<h2 style="color: #88d5a4;">SteamCookieExtractor2</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/manifest.json" style="color: #d183c2;">SteamCookieExtractor2/manifest.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/options.html" style="color: #7ce387;">SteamCookieExtractor2/options.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/popup.html" style="color: #b9a72c;">SteamCookieExtractor2/popup.html</a></li>
<h2 style="color: #987ae8;">SteamCookieExtractor2/icons</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/icon128.png" style="color: #98b655;">SteamCookieExtractor2/icons/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/icon16.png" style="color: #958046;">SteamCookieExtractor2/icons/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/icon48.png" style="color: #b87780;">SteamCookieExtractor2/icons/icon48.png</a></li>
<h2 style="color: #c6699d;">SteamCookieExtractor2/icons/images</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/images/icon128.png" style="color: #aac7aa;">SteamCookieExtractor2/icons/images/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/images/icon16.png" style="color: #34b9fc;">SteamCookieExtractor2/icons/images/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/images/icon48.png" style="color: #e192bc;">SteamCookieExtractor2/icons/images/icon48.png</a></li>
<h2 style="color: #50e164;">YouTubeTVVolumeControl</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/icon128.png" style="color: #989028;">YouTubeTVVolumeControl/icon128.png</a></li></ul>`;
                            break;
                        case 'file-list-9':
                            file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/icon16.png" style="color: #f4964e;">YouTubeTVVolumeControl/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/icon48.png" style="color: #939bbb;">YouTubeTVVolumeControl/icon48.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/manifest.json" style="color: #33f791;">YouTubeTVVolumeControl/manifest.json</a></li>
<h2 style="color: #de92f7;">YouTubeVolumeControl</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icon128.png" style="color: #e7b8bd;">YouTubeVolumeControl/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icon16.png" style="color: #58c5c2;">YouTubeVolumeControl/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icon48.png" style="color: #6b7ce7;">YouTubeVolumeControl/icon48.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/manifest.json" style="color: #c1c5d1;">YouTubeVolumeControl/manifest.json</a></li>
<h2 style="color: #4cb5eb;">YouTubeVolumeControl/icons</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/icon128.png" style="color: #3898cb;">YouTubeVolumeControl/icons/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/icon16.png" style="color: #838179;">YouTubeVolumeControl/icons/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/icon48.png" style="color: #2adfd4;">YouTubeVolumeControl/icons/icon48.png</a></li>
<h2 style="color: #7d9ec5;">YouTubeVolumeControl/icons/images</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/images/icon128.png" style="color: #8eb3c1;">YouTubeVolumeControl/icons/images/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/images/icon16.png" style="color: #69b0dc;">YouTubeVolumeControl/icons/images/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/images/icon48.png" style="color: #50c355;">YouTubeVolumeControl/icons/images/icon48.png</a></li>
<h2 style="color: #34a89d;">assets</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-city-background.png" style="color: #6ed811;">assets/kiwi-city-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-default-background.png" style="color: #5b9057;">assets/kiwi-default-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-flower-background.png" style="color: #d8a971;">assets/kiwi-flower-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-green-background.png" style="color: #6daff0;">assets/kiwi-green-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-purple-background.png" style="color: #57eb7b;">assets/kiwi-purple-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-space-apple-background.png" style="color: #dab69f;">assets/kiwi-space-apple-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-swirls-background.png" style="color: #a5a3f8;">assets/kiwi-swirls-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-trees-background.png" style="color: #f165c2;">assets/kiwi-trees-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-vaporwave-logo.png" style="color: #79a6c0;">assets/kiwi-vaporwave-logo.png</a></li>
<h2 style="color: #a88771;">src</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/src/generate_file_list.py" style="color: #bdc80c;">src/generate_file_list.py</a></li></ul>`;
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
                    file_list_html = `<ul><h2 style="color: #7fa38b;">Repo Root</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.black" style="color: #28b199;">.black</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.copilot-instructions.md" style="color: #b8cd94;">.copilot-instructions.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.editorconfig" style="color: #fa59dc;">.editorconfig</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.gitignore" style="color: #8fd77e;">.gitignore</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.gitleaksignore" style="color: #84d9dc;">.gitleaksignore</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.hintrc" style="color: #eebd2c;">.hintrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.jsbeautifyrc" style="color: #82a457;">.jsbeautifyrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.jscsrc" style="color: #23ca2d;">.jscsrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.npmrc" style="color: #2cfc6f;">.npmrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.pre-commit-config.yaml" style="color: #f45ff5;">.pre-commit-config.yaml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.pre-commit-hooks.yaml" style="color: #bd89af;">.pre-commit-hooks.yaml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierignore" style="color: #9d7ef4;">.prettierignore</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierrc" style="color: #28de65;">.prettierrc</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierrc.noplugins" style="color: #c87650;">.prettierrc.noplugins</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.prettierrc.temp" style="color: #2ce040;">.prettierrc.temp</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.stylelintrc.json" style="color: #a7b47d;">.stylelintrc.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vale.ini" style="color: #ab9493;">.vale.ini</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CNAME" style="color: #50b02c;">CNAME</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CODE_OF_CONDUCT.md" style="color: #a6d772;">CODE_OF_CONDUCT.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CONTRIBUTING.md" style="color: #81d32e;">CONTRIBUTING.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Gemfile" style="color: #b3c758;">Gemfile</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Gemfile.lock" style="color: #b4ac25;">Gemfile.lock</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/KudoAll-Strava-Garmin.user.test.cjs" style="color: #3fe5b7;">KudoAll-Strava-Garmin.user.test.cjs</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/LICENSE" style="color: #70c884;">LICENSE</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Microsoft.PowerShell_profile.ps1" style="color: #5deb55;">Microsoft.PowerShell_profile.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures.html" style="color: #22dc7a;">OldRedditNewProfilePictures.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PrettierFormatExcludePreprocessor.ps1" style="color: #e0ab2c;">PrettierFormatExcludePreprocessor.ps1</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/README.md" style="color: #a79697;">README.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SECURITY.md" style="color: #35ef83;">SECURITY.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify-local.html" style="color: #79b0d2;">beautify-local.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify.html" style="color: #60b273;">beautify.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/convertHexToRgba.html" style="color: #849090;">convertHexToRgba.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/cyclingCalculators.html" style="color: #3cd475;">cyclingCalculators.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/deno.json" style="color: #2fe269;">deno.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/deno.lock" style="color: #54d903;">deno.lock</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/eslint.config.mjs" style="color: #db77fc;">eslint.config.mjs</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/favicon.ico" style="color: #9f75da;">favicon.ico</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/favicon.png" style="color: #83d4f7;">favicon.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/file_list.html" style="color: #309ba3;">file_list.html</a></li></ul>`;
                    break;
                case 'file-list-2':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/file_list.md" style="color: #74b9a9;">file_list.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/generate_gemfile.rb" style="color: #fda24b;">generate_gemfile.rb</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/jsconfig.json" style="color: #b88e6d;">jsconfig.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/package-lock.json" style="color: #3fd0b8;">package-lock.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/package.json" style="color: #d88722;">package.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/requirements.txt" style="color: #599a59;">requirements.txt</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/robots.txt" style="color: #bd8a20;">robots.txt</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/sitemap.xml" style="color: #8ec8a1;">sitemap.xml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/useragent-switcher-preferences.json" style="color: #ed9e15;">useragent-switcher-preferences.json</a></li>
<h2 style="color: #39e61b;">Userstyles</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/17track.net-DarkMode.user.css" style="color: #66b4e6;">17track.net-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ActivityFixDarkMode.user.css" style="color: #f5a26f;">ActivityFixDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Archive.orgNightTheme%28Updated%29.user.css" style="color: #3ccdb7;">Archive.orgNightTheme(Updated).user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Benjdd-dark.user.css" style="color: #b5b429;">Benjdd-dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CFG.tf-DarkMode.user.css" style="color: #a575f8;">CFG.tf-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CSSGradient-DarkMode.user.css" style="color: #abaa7e;">CSSGradient-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CSSPortal-Dark.user.css" style="color: #e19321;">CSSPortal-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Copilot-Microsoft-Blackmode.user.css" style="color: #8ea44c;">Copilot-Microsoft-Blackmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/CrystalMathLabs-BlackMode.user.css" style="color: #d698cf;">CrystalMathLabs-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/DCRainMaker-DarkMode.user.css" style="color: #b98ac8;">DCRainMaker-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Dearrow-RemoveDearrowButton.user.css" style="color: #a59119;">Dearrow-RemoveDearrowButton.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/DeepSeek-DarkMode.user.css" style="color: #4ab2ab;">DeepSeek-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ESPN-DarkMode.user.css" style="color: #5b9c60;">ESPN-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/FandomDark.user.css" style="color: #599d92;">FandomDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Favero-DarkMode.user.css" style="color: #8bc7b2;">Favero-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Fedex.com-DarkMode.user.css" style="color: #c19e7d;">Fedex.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/FitFileViewer-DarkTheme.user.css" style="color: #f793ce;">FitFileViewer-DarkTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/FiveServer-DarkMode.user.css" style="color: #fc79b0;">FiveServer-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GOTOES.org-DarkMode.user.css" style="color: #bd9b7b;">GOTOES.org-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GTBikeV-DarkMode.user.css" style="color: #2ce8f5;">GTBikeV-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminBadges-DarkMode.user.css" style="color: #4ccffe;">GarminBadges-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminConnectDark.user.css" style="color: #b3d56b;">GarminConnectDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminRumors-DarkMode.user.css" style="color: #d267fc;">GarminRumors-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GreasyForkDark.user.css" style="color: #7bca55;">GreasyForkDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Gyazo-DarkMode.user.css" style="color: #48c9ba;">Gyazo-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Kiwifarms-Black.user.css" style="color: #54a376;">Kiwifarms-Black.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Kiwifarms-Halloween.user.css" style="color: #d96c46;">Kiwifarms-Halloween.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Kiwifarms-Vaporwave.user.css" style="color: #45a8ba;">Kiwifarms-Vaporwave.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Klimat.app-DarkMode.user.css" style="color: #dd848e;">Klimat.app-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MarkdownViewer%2B%2BTheme.user.css" style="color: #98ba85;">MarkdownViewer++Theme.user.css</a></li></ul>`;
                    break;
                case 'file-list-3':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Medicare-Gov-Dark-Mode.user.css" style="color: #37bd47;">Medicare-Gov-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MyBikeTraffic-DarkMode.user.css" style="color: #81d729;">MyBikeTraffic-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MyWorkoutCompanion-Dark.user.css" style="color: #d09332;">MyWorkoutCompanion-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Nascar.com-DarkMode.user.css" style="color: #76dda6;">Nascar.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/NewYorkerDarkMode.user.css" style="color: #cdc406;">NewYorkerDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/NewYorkerSimpleDarkMode.user.css" style="color: #59a0fa;">NewYorkerSimpleDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRS-HiScores-BlackMode.user.css" style="color: #f89994;">OSRS-HiScores-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWorldHeatmap-Dark.user.css" style="color: #39e97b;">OSRSWorldHeatmap-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OsrsWikiDarkMode.user.css" style="color: #359ab5;">OsrsWikiDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Papertrails-DarkMode.user.css" style="color: #deb2ee;">Papertrails-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PathFinderW3School-Dark.user.css" style="color: #e673b6;">PathFinderW3School-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PowerMeter.cc-DarkMode.user.css" style="color: #8ca377;">PowerMeter.cc-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/PromptHero-Dark.user.css" style="color: #e58396;">PromptHero-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RedditColoredComments.user.css" style="color: #ce9b73;">RedditColoredComments.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Scrap.tf-BlackTheme.user.css" style="color: #aac7af;">Scrap.tf-BlackTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Skial-CustomTheme.user.css" style="color: #dc6b7c;">Skial-CustomTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SportSurge-BlackMode.user.css" style="color: #31b165;">SportSurge-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SquadRats-Dark.user.css" style="color: #fd859a;">SquadRats-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Statshunters-Dark.user.css" style="color: #34c643;">Statshunters-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamDB-Black-Mode.user.css" style="color: #80e306;">SteamDB-Black-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamDB-Dark-Mode.user.css" style="color: #478dce;">SteamDB-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Brawlhalla.user.css" style="color: #31a25e;">SteamStat.us-Re-Remastered-Brawlhalla.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Christmas-Style.user.css" style="color: #daca32;">SteamStat.us-Re-Remastered-Christmas-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Detroit-Lions-Style.user.css" style="color: #8aec04;">SteamStat.us-Re-Remastered-Detroit-Lions-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Detroit-Tigers.user.css" style="color: #e581c4;">SteamStat.us-Re-Remastered-Detroit-Tigers.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Easter-Style.user.css" style="color: #30c7bf;">SteamStat.us-Re-Remastered-Easter-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Green-BlackStyle.user.css" style="color: #6bb18a;">SteamStat.us-Re-Remastered-Green-BlackStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Halloween-Style.user.css" style="color: #de9589;">SteamStat.us-Re-Remastered-Halloween-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Lime%20Green-Purple%20Style.user.css" style="color: #699583;">SteamStat.us-Re-Remastered-Lime Green-Purple Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Miami-Heat.user.css" style="color: #e6c825;">SteamStat.us-Re-Remastered-Miami-Heat.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-NASCAR.user.css" style="color: #24dd3e;">SteamStat.us-Re-Remastered-NASCAR.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Orange-BlackStyle.user.css" style="color: #8e7aad;">SteamStat.us-Re-Remastered-Orange-BlackStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-PCMasterRace.user.css" style="color: #2aa1d2;">SteamStat.us-Re-Remastered-PCMasterRace.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Pink-BlackStyle.user.css" style="color: #77a1da;">SteamStat.us-Re-Remastered-Pink-BlackStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Purple.user.css" style="color: #a8a1bf;">SteamStat.us-Re-Remastered-Purple.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-RainbowStyle.user.css" style="color: #5ccd13;">SteamStat.us-Re-Remastered-RainbowStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-SteamStyle.user.css" style="color: #56c5a3;">SteamStat.us-Re-Remastered-SteamStyle.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Sunset-Style.user.css" style="color: #bfaf1d;">SteamStat.us-Re-Remastered-Sunset-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-TeamFortress2.user.css" style="color: #33f222;">SteamStat.us-Re-Remastered-TeamFortress2.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-The-Crew-Motorfest.user.css" style="color: #da67ab;">SteamStat.us-Re-Remastered-The-Crew-Motorfest.user.css</a></li></ul>`;
                    break;
                case 'file-list-4':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-TourDeFrance.user.css" style="color: #40979e;">SteamStat.us-Re-Remastered-TourDeFrance.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-USA-Style.user.css" style="color: #37fb57;">SteamStat.us-Re-Remastered-USA-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Windows95.user.css" style="color: #e580f1;">SteamStat.us-Re-Remastered-Windows95.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Witcher3.user.css" style="color: #f88746;">SteamStat.us-Re-Remastered-Witcher3.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Wolverines-Style.user.css" style="color: #42de73;">SteamStat.us-Re-Remastered-Wolverines-Style.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-WorldOfWarcraft.user.css" style="color: #58b9c4;">SteamStat.us-Re-Remastered-WorldOfWarcraft.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered-Zwift.user.css" style="color: #7088c5;">SteamStat.us-Re-Remastered-Zwift.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamStat.us-Re-Remastered.user.css" style="color: #e1c14f;">SteamStat.us-Re-Remastered.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamTradeMatcher-DarkMode.user.css" style="color: #a093f8;">SteamTradeMatcher-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StepSecurityDarkMode.user.css" style="color: #f4c919;">StepSecurityDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaAutoDarkTheme.user.css" style="color: #61aed8;">StravaAutoDarkTheme.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaStratTracker-DarkMode.user.css" style="color: #f7b8b3;">StravaStratTracker-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StreamingSitesStreamsBlackDarkMode.user.css" style="color: #b3db10;">StreamingSitesStreamsBlackDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Stylus-DarkTheme-Updated.user.css" style="color: #f5792c;">Stylus-DarkTheme-Updated.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StylusEditorChromeDark-Fixed.user.css" style="color: #ca7d99;">StylusEditorChromeDark-Fixed.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StylusFluent-Updated.user.css" style="color: #efa5aa;">StylusFluent-Updated.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TamperMonkey-DarkGreen.user.css" style="color: #2af806;">TamperMonkey-DarkGreen.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TamperMonkey-DarkMode.user.css" style="color: #3ff0b0;">TamperMonkey-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TeamFortressWIki-Dark.user.css" style="color: #ab8d76;">TeamFortressWIki-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TechPowerUp-DarkMode.user.css" style="color: #71ad56;">TechPowerUp-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/TrainingPeaks-DarkMode.user.css" style="color: #dd7bf5;">TrainingPeaks-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UPS.com-DarkMode.user.css" style="color: #97ccab;">UPS.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Unroll.me-DarkMode.user.css" style="color: #8dcc80;">Unroll.me-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UptimeRobotDark.user.css" style="color: #9cd64a;">UptimeRobotDark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserStyle-Root-ColorTemplate.user.css" style="color: #9dd29d;">UserStyle-Root-ColorTemplate.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserscriptTemplate.user.css" style="color: #e096e2;">UserscriptTemplate.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserscriptZone-Dark.user.css" style="color: #59a44a;">UserscriptZone-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserstyleWorld-DarkBamaBraves.user.css" style="color: #30c7d9;">UserstyleWorld-DarkBamaBraves.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/VisualStudioCode-DarkMode.user.css" style="color: #68b26d;">VisualStudioCode-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/WahooFitnessDarkMode.user.css" style="color: #27a8d0;">WahooFitnessDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Walmart.com-DarkMode.user.css" style="color: #33eb0e;">Walmart.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wanderer-Dark.user.css" style="color: #abc1ff;">Wanderer-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Weather.com-DarkMode.user.css" style="color: #be944e;">Weather.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/WebHint-Dark.user.css" style="color: #3ed878;">WebHint-Dark.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wigle-DarkMode-Beta.user.css" style="color: #9ca929;">Wigle-DarkMode-Beta.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wigle-DarkMode.user.css" style="color: #ea8abc;">Wigle-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Wikipedia-OLED-SettingsPage.user.css" style="color: #dea9d5;">Wikipedia-OLED-SettingsPage.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Windy-DarkMode.user.css" style="color: #e3ac0d;">Windy-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YT-Vibra.user.css" style="color: #38edf2;">YT-Vibra.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeRainbowProgress.user.css" style="color: #4bd415;">YoutubeRainbowProgress.user.css</a></li></ul>`;
                    break;
                case 'file-list-5':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeScrubberColors.user.css" style="color: #de7318;">YoutubeScrubberColors.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeTV-BlackMode.user.css" style="color: #7b9bd6;">YoutubeTV-BlackMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Zwift.com-Dark-Mode.user.css" style="color: #8bc872;">Zwift.com-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwiftHacks-DarkMode.user.css" style="color: #4b997c;">ZwiftHacks-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwiftInsiderDarkMode.user.css" style="color: #d6a4db;">ZwiftInsiderDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwiftPower.comDark%20Mode.user.css" style="color: #83aff0;">ZwiftPower.comDark Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Zwiftalizer.com-Darker-Mode.user.css" style="color: #dcc513;">Zwiftalizer.com-Darker-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ZwifterBikesDarkMode.user.css" style="color: #e16760;">ZwifterBikesDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/abcnews.go.com-DarkMode.user.css" style="color: #a29272;">abcnews.go.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/bicycling-DarkMode.user.css" style="color: #36c31c;">bicycling-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/detroitmi.gov-DarkMode.user.css" style="color: #40efa4;">detroitmi.gov-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/ebay-Dark-Mode.user.css" style="color: #638cd0;">ebay-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/findthatride-darkmode.user.css" style="color: #2aed62;">findthatride-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/fitfiletools-darkmode.user.css" style="color: #31e7d8;">fitfiletools-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/fivethirtyeight.comDarkMode.user.css" style="color: #36ac0a;">fivethirtyeight.comDarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/jalopnik.com-DarkMode.user.css" style="color: #b8dc12;">jalopnik.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/kom.club-darkmode.user.css" style="color: #f97738;">kom.club-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/makinolo.com-Dark-Mode.user.css" style="color: #2eb081;">makinolo.com-Dark-Mode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/michigan.gov-DarkMode.user.css" style="color: #4ebaad;">michigan.gov-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/mywindsock-darkmode.user.css" style="color: #5dda1b;">mywindsock-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/nbcwashington.com-DarkMode.user.css" style="color: #698ef4;">nbcwashington.com-DarkMode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/nytimes.com-DarkModeSimple.user.css" style="color: #d28330;">nytimes.com-DarkModeSimple.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/p337info-tf2.user.css" style="color: #84b5ee;">p337info-tf2.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/runalyze-darkmode.user.css" style="color: #f87587;">runalyze-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/stravatoolbox-darkmode.user.css" style="color: #7aa62c;">stravatoolbox-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/veloviewer-darkmode.user.css" style="color: #40f70c;">veloviewer-darkmode.user.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/zwifthub.com-darkmode.user.css" style="color: #f38d9d;">zwifthub.com-darkmode.user.css</a></li>
<h2 style="color: #2bcbe2;">Userscripts</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/AscentDescentMetersToFeet.user.js" style="color: #d0aa27;">AscentDescentMetersToFeet.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/AutoMergeDependabotPRs.user.js" style="color: #9771ed;">AutoMergeDependabotPRs.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/DeleteYoutubePlaylists.user.js" style="color: #9ae20f;">DeleteYoutubePlaylists.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnhanceYouTubeProfilePictures.user.js" style="color: #73aa31;">EnhanceYouTubeProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnlargeKiwifarmsProfilePictures.user.js" style="color: #bccb16;">EnlargeKiwifarmsProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnlargeYouTubeChatProfilePictures.user.js" style="color: #45c192;">EnlargeYouTubeChatProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/EnlargeYouTubeCommentSectionProfilePictures.user.js" style="color: #adb7cf;">EnlargeYouTubeCommentSectionProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GOTOESFitFileEditor-AutoClosePopup.user.js" style="color: #67949a;">GOTOESFitFileEditor-AutoClosePopup.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GarminConnectRemoveGear.user.js" style="color: #8ab7cb;">GarminConnectRemoveGear.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GithubMarkMergedDone.user.js" style="color: #e49567;">GithubMarkMergedDone.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/GyazoDirectLink.user.js" style="color: #6d9637;">GyazoDirectLink.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/HideChineseUserstyles.user.js" style="color: #9f94d7;">HideChineseUserstyles.user.js</a></li></ul>`;
                    break;
                case 'file-list-6':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/HideNon-EnglishUserstyles.user.js" style="color: #9ccce0;">HideNon-EnglishUserstyles.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/KudoAll-Strava-Garmin.user.js" style="color: #8392e1;">KudoAll-Strava-Garmin.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/MergeDependabotPRs.user.js" style="color: #f08926;">MergeDependabotPRs.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWikiAuto-Categorizer-SlowMode.user.js" style="color: #7ad1ed;">OSRSWikiAuto-Categorizer-SlowMode.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWikiAuto-Categorizer.user.js" style="color: #fe53e9;">OSRSWikiAuto-Categorizer.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OSRSWikiAuto-Navbox-SlowMode.user.js" style="color: #bb7568;">OSRSWikiAuto-Navbox-SlowMode.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-API-Key-Version-Reddit-Only-Version.user.js" style="color: #e07eb3;">OldRedditNewProfilePictures-API-Key-Version-Reddit-Only-Version.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-API-Key-Version-Reddit-Stream-Version.user.js" style="color: #80cc0f;">OldRedditNewProfilePictures-API-Key-Version-Reddit-Stream-Version.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-API-Key-Version.user.js" style="color: #4ba01a;">OldRedditNewProfilePictures-API-Key-Version.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures-UniversalVersion.user.js" style="color: #fcb801;">OldRedditNewProfilePictures-UniversalVersion.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures.user.js" style="color: #4c89cf;">OldRedditNewProfilePictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures/Old%20Reddit%20with%20New%20Profile%20Pictures.user.js" style="color: #fe7a2c;">OldRedditNewProfilePictures/Old Reddit with New Profile Pictures.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RedditStreamAutoRefresher.user.js" style="color: #8a92f1;">RedditStreamAutoRefresher.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RedditStreamAutoRefresherFaster.user.js" style="color: #6d9885;">RedditStreamAutoRefresherFaster.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/RightClickEnable.user.js" style="color: #8dbe60;">RightClickEnable.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaAutoAuthorize.user.js" style="color: #b59468;">StravaAutoAuthorize.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/StravaTextAuto-Selector.user.js" style="color: #cab6b7;">StravaTextAuto-Selector.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SuperchargedLocalDirectoryWebUI.user.js" style="color: #88b9ab;">SuperchargedLocalDirectoryWebUI.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/UserstyleWorld-SyncStyles.user.js" style="color: #899498;">UserstyleWorld-SyncStyles.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTV-Volume-Rememberer.user.js" style="color: #41caad;">YouTubeTV-Volume-Rememberer.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl.user.js" style="color: #ccb360;">YouTubeTVVolumeControl.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl.user.js" style="color: #e8a3bf;">YouTubeVolumeControl.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YoutubeVolumeDisplay.user.js" style="color: #3bd254;">YoutubeVolumeDisplay.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Zwift-Give-RideOns-to-Everyone.user.js" style="color: #fc9953;">Zwift-Give-RideOns-to-Everyone.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/reddit-stream-Enhancements.user.js" style="color: #ea63a9;">reddit-stream-Enhancements.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-Add-Balance-Original.user.js" style="color: #f55fb9;">strava-balance/Strava-Add-Balance-Original.user.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-Add-Balance-Updated.user.js" style="color: #eb659b;">strava-balance/Strava-Add-Balance-Updated.user.js</a></li>
<h2 style="color: #ae87ac;">CSS</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/Discord-Dark%2B-Default-Member-List.css" style="color: #5cf011;">Discord-Dark+-Default-Member-List.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/styles.css" style="color: #d797a1;">YouTubeVolumeControl/styles.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.css" style="color: #6de449;">codemirror.css</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.min.css" style="color: #2db5e9;">codemirror.min.css</a></li>
<h2 style="color: #5dc827;">JavaScript</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.eslintrc.js" style="color: #ff9aad;">.eslintrc.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/background.js" style="color: #8b9721;">SteamCookieExtractor2/background.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/content.js" style="color: #77d689;">SteamCookieExtractor2/content.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/options.js" style="color: #b6b59f;">SteamCookieExtractor2/options.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/popup.js" style="color: #30a170;">SteamCookieExtractor2/popup.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/WIndyPlugin.min.js" style="color: #33c15d;">WIndyPlugin.min.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/background.js" style="color: #d682d2;">YouTubeTVVolumeControl/background.js</a></li></ul>`;
                    break;
                case 'file-list-7':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/content.js" style="color: #cfc724;">YouTubeTVVolumeControl/content.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/background.js" style="color: #4eae6e;">YouTubeVolumeControl/background.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/content.js" style="color: #e39908;">YouTubeVolumeControl/content.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify-css-mod.js" style="color: #5e8c7f;">beautify-css-mod.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/beautify.js" style="color: #ef78b0;">beautify.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.js" style="color: #ef85e7;">codemirror.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/codemirror.min.js" style="color: #da75a9;">codemirror.min.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/convertHexToRgba.js" style="color: #bbc999;">convertHexToRgba.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/css.js" style="color: #cdc474;">css.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/css.min.js" style="color: #27a8d4;">css.min.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/cyclingCalculators.js" style="color: #3daaee;">cyclingCalculators.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-AddBalance-Updated.js" style="color: #ba817d;">strava-balance/Strava-AddBalance-Updated.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/Strava-AddBalance.js" style="color: #f094dd;">strava-balance/Strava-AddBalance.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/binary-Updated.js" style="color: #57cdf1;">strava-balance/binary-Updated.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/binary.js" style="color: #77c11f;">strava-balance/binary.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/buffer-5.6.1/base64-js-1.3.1/index.js" style="color: #2ca681;">strava-balance/buffer-5.6.1/base64-js-1.3.1/index.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/buffer-5.6.1/ieee754-1.1.13/index.js" style="color: #b2824e;">strava-balance/buffer-5.6.1/ieee754-1.1.13/index.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/buffer-5.6.1/index.js" style="color: #32cf95;">strava-balance/buffer-5.6.1/index.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/fit-parser-Updated.js" style="color: #74c449;">strava-balance/fit-parser-Updated.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/fit-parser.js" style="color: #23c089;">strava-balance/fit-parser.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/fit.js" style="color: #e9739b;">strava-balance/fit.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/messages.js" style="color: #879c2f;">strava-balance/messages.js</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/strava-balance/strava-fit-parser.js" style="color: #fe687f;">strava-balance/strava-fit-parser.js</a></li>
<h2 style="color: #23b05f;">YAML</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/dependabot.yml" style="color: #db730c;">.github/dependabot.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/labeler.yml" style="color: #a5a3cb;">.github/labeler.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/ActionLint.yml" style="color: #9491ca;">.github/workflows/ActionLint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/Bandit.yml" style="color: #f66686;">.github/workflows/Bandit.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/Snake.yml" style="color: #70bd09;">.github/workflows/Snake.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/black-formatter.yml" style="color: #bfc891;">.github/workflows/black-formatter.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/codeql.yml" style="color: #64cafa;">.github/workflows/codeql.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/defender.yml" style="color: #8ba9da;">.github/workflows/defender.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/deno.yml" style="color: #73a795;">.github/workflows/deno.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/dependency-review.yml" style="color: #60ac20;">.github/workflows/dependency-review.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/devskim.yml" style="color: #e0c319;">.github/workflows/devskim.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/eslint.yml" style="color: #6285b8;">.github/workflows/eslint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/generate-file-list.yml" style="color: #93ae50;">.github/workflows/generate-file-list.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/greetings.yml" style="color: #5ed6e0;">.github/workflows/greetings.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/label.yml" style="color: #62c63c;">.github/workflows/label.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/ossar.yml" style="color: #d0b3c3;">.github/workflows/ossar.yml</a></li></ul>`;
                    break;
                case 'file-list-8':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/osv-scanner.yml" style="color: #60e785;">.github/workflows/osv-scanner.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/scorecards.yml" style="color: #f583b4;">.github/workflows/scorecards.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/semgrep.yml" style="color: #a292e4;">.github/workflows/semgrep.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/sitemap.yml" style="color: #faa514;">.github/workflows/sitemap.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/sobelow.yml" style="color: #2bb3ca;">.github/workflows/sobelow.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/stale.yml" style="color: #549b95;">.github/workflows/stale.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/static.yml" style="color: #d9941b;">.github/workflows/static.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/stylelint.yml" style="color: #f3862a;">.github/workflows/stylelint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/workflows/super-linter.yml" style="color: #e4c222;">.github/workflows/super-linter.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.markdownlint.yml" style="color: #c7bd57;">.markdownlint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.scss-lint.yml" style="color: #9cb649;">.scss-lint.yml</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/_config.yml" style="color: #39dd42;">_config.yml</a></li>
<h2 style="color: #e0acf0;">.github/PULL_REQUEST_TEMPLATE</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/PULL_REQUEST_TEMPLATE/pull_request_template.md" style="color: #8ea815;">.github/PULL_REQUEST_TEMPLATE/pull_request_template.md</a></li>
<h2 style="color: #3998fd;">.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/bug_report.md" style="color: #cf9737;">.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/bug_report.md</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/feature_request.md" style="color: #b4ad81;">.github/PULL_REQUEST_TEMPLATE/ISSUE_TEMPLATE/feature_request.md</a></li>
<h2 style="color: #e38b35;">.vscode</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/generate_file_list.py" style="color: #e8c83d;">.vscode/generate_file_list.py</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/launch.json" style="color: #b2b1ed;">.vscode/launch.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/settings.json" style="color: #67b9cc;">.vscode/settings.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/tasks.json" style="color: #d47a49;">.vscode/tasks.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/.vscode/test_generate_file_list.py" style="color: #c3b003;">.vscode/test_generate_file_list.py</a></li>
<h2 style="color: #41b75c;">OldRedditNewProfilePictures</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures/Old%20Reddit%20with%20New%20Profile%20Pictures.options.json" style="color: #69b194;">OldRedditNewProfilePictures/Old Reddit with New Profile Pictures.options.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/OldRedditNewProfilePictures/Old%20Reddit%20with%20New%20Profile%20Pictures.storage.json" style="color: #98ba48;">OldRedditNewProfilePictures/Old Reddit with New Profile Pictures.storage.json</a></li>
<h2 style="color: #88d5a4;">SteamCookieExtractor2</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/manifest.json" style="color: #d183c2;">SteamCookieExtractor2/manifest.json</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/options.html" style="color: #7ce387;">SteamCookieExtractor2/options.html</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/popup.html" style="color: #b9a72c;">SteamCookieExtractor2/popup.html</a></li>
<h2 style="color: #987ae8;">SteamCookieExtractor2/icons</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/icon128.png" style="color: #98b655;">SteamCookieExtractor2/icons/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/icon16.png" style="color: #958046;">SteamCookieExtractor2/icons/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/icon48.png" style="color: #b87780;">SteamCookieExtractor2/icons/icon48.png</a></li>
<h2 style="color: #c6699d;">SteamCookieExtractor2/icons/images</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/images/icon128.png" style="color: #aac7aa;">SteamCookieExtractor2/icons/images/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/images/icon16.png" style="color: #34b9fc;">SteamCookieExtractor2/icons/images/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/SteamCookieExtractor2/icons/images/icon48.png" style="color: #e192bc;">SteamCookieExtractor2/icons/images/icon48.png</a></li>
<h2 style="color: #50e164;">YouTubeTVVolumeControl</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/icon128.png" style="color: #989028;">YouTubeTVVolumeControl/icon128.png</a></li></ul>`;
                    break;
                case 'file-list-9':
                    file_list_html = `<ul><li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/icon16.png" style="color: #f4964e;">YouTubeTVVolumeControl/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/icon48.png" style="color: #939bbb;">YouTubeTVVolumeControl/icon48.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeTVVolumeControl/manifest.json" style="color: #33f791;">YouTubeTVVolumeControl/manifest.json</a></li>
<h2 style="color: #de92f7;">YouTubeVolumeControl</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icon128.png" style="color: #e7b8bd;">YouTubeVolumeControl/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icon16.png" style="color: #58c5c2;">YouTubeVolumeControl/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icon48.png" style="color: #6b7ce7;">YouTubeVolumeControl/icon48.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/manifest.json" style="color: #c1c5d1;">YouTubeVolumeControl/manifest.json</a></li>
<h2 style="color: #4cb5eb;">YouTubeVolumeControl/icons</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/icon128.png" style="color: #3898cb;">YouTubeVolumeControl/icons/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/icon16.png" style="color: #838179;">YouTubeVolumeControl/icons/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/icon48.png" style="color: #2adfd4;">YouTubeVolumeControl/icons/icon48.png</a></li>
<h2 style="color: #7d9ec5;">YouTubeVolumeControl/icons/images</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/images/icon128.png" style="color: #8eb3c1;">YouTubeVolumeControl/icons/images/icon128.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/images/icon16.png" style="color: #69b0dc;">YouTubeVolumeControl/icons/images/icon16.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/YouTubeVolumeControl/icons/images/icon48.png" style="color: #50c355;">YouTubeVolumeControl/icons/images/icon48.png</a></li>
<h2 style="color: #34a89d;">assets</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-city-background.png" style="color: #6ed811;">assets/kiwi-city-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-default-background.png" style="color: #5b9057;">assets/kiwi-default-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-flower-background.png" style="color: #d8a971;">assets/kiwi-flower-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-green-background.png" style="color: #6daff0;">assets/kiwi-green-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-purple-background.png" style="color: #57eb7b;">assets/kiwi-purple-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-space-apple-background.png" style="color: #dab69f;">assets/kiwi-space-apple-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-swirls-background.png" style="color: #a5a3f8;">assets/kiwi-swirls-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-trees-background.png" style="color: #f165c2;">assets/kiwi-trees-background.png</a></li>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/assets/kiwi-vaporwave-logo.png" style="color: #79a6c0;">assets/kiwi-vaporwave-logo.png</a></li>
<h2 style="color: #a88771;">src</h2>
<li><a href="https://github.com/Nick2bad4u/UserStyles/blob/main/src/generate_file_list.py" style="color: #bdc80c;">src/generate_file_list.py</a></li></ul>`;
                    break;
            }
            placeholder.innerHTML = file_list_html;
        });
    }
});
</script>
