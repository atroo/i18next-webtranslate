<div class="navbar navbar-fixed-top">
    <div class="navbar-inner">
        <div class="container">
            <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                <span class="iconbar"></span>
                <span class="iconbar"></span>
                <span class="iconbar"></span>
            </a>
            <a class="brand" href="/">i18next - webtranslate</a>
            <div class="nav-collapse">
                <ul class="nav pull-right">
                    <li class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown">
                            <i class="large icon-cog"></i>
                            <b class="caret"></b>
                        </a>
                        <ul class="languages dropdown-menu">
                            <li class="nav-header">Change language:</li>
                        </ul>
                    </li>
                </ul>
                <ul class="nav pull-right">
                    <li>
                        <a href="http://jamuhl.github.com/i18next/pages/doc_features.html" target="_new">
                            <i class="large icon-book"></i>
                            i18next - doc
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>


<!--
.navbar.navbar-fixed-top
    .navbar-inner
        .container

            //.btn-navbar is used as the toggle for collapsed navbar content
            a.btn.btn-navbar(data-toggle='collapse', data-target='.nav-collapse')
                span.icon-bar
                span.icon-bar
                span.icon-bar
 
            // Be sure to leave the brand out there if you want it shown
            a.brand(href='/') 

            // Everything you want hidden at 940px or less, place within here
            .nav-collapse

                ul.nav.pull-right
                    li.dropdown
                        a.dropdown-toggle(data-toggle='dropdown')
                            i.large.icon-cog
                            b.caret

                        ul.languages.dropdown-menu
                            li.nav-header Change language:

                ul.nav.pull-right
                    li
                        a(href='http://jamuhl.github.com/i18next/pages/doc_features.html', target='_new')
                            i.icon-book
                            | i18next - doc
-->