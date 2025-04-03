import attrs from "markdown-it-attrs";
import footnote_plugin from "markdown-it-footnote";
import markdownItWikilinks from "markdown-it-wikilinks";
import markdownitExternalLink from "markdown-it-external-link";
import markdownItExpandTabs from "markdown-it-expand-tabs";

export default function configureMarkdown(eleventyConfig) {
    const renderRules = {
        footnote_caption: ['[', '[Note '],
    };

    // Customize Markdown library settings:
    eleventyConfig.amendLibrary("md", mdLib => {
      mdLib
        .set({ linkify: true })
        .use(attrs)
        .use(footnote_plugin)
        .use(markdownItWikilinks({
          makeAllLinksAbsolute: true,
          baseURL: '/notebook',
          uriSuffix: ''
        }))
        .use(markdownitExternalLink,
          { hosts: ['https://jordan.thirus.me', 'http://localhost:8080'] }
        )
        .use(markdownItExpandTabs)

        // Configure markdown-it-footnote via https://leilukin.com/articles/accessible-footnotes/
        mdLib.renderer.rules.footnote_block_open = () => (
            '<hr class="footnotes-sep">\n' +
            '<section class="footnotes">\n' +
            `<h2>Footnotes</h2>\n`
        );

        mdLib.renderer.rules.footnote_anchor = (tokens, idx, options, env, slf) => {
            let id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);

            if (tokens[idx].meta.subId > 0) id += `:${tokens[idx].meta.subId}`;

            /* ↩ with escape code to prevent display as Apple Emoji on iOS */
            return `
                <span class="footnote-item__back">
                    <a href="#fnref${id}" class="footnote-backref">
                        <span aria-hidden="true">\u21a9\uFE0E</span>
                        Back to reference ${id}
                    </a>
                </span>
            `;
        };

        Object.keys(renderRules).map(rule => {
            let defaultRender = mdLib.renderer.rules[rule];
            mdLib.renderer.rules[rule] = (tokens, idx, options, env, self) => {
                return defaultRender(tokens, idx, options, env, self).replace(...renderRules[rule]);
            }
        });

    });
};  