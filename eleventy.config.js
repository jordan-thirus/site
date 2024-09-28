const { DateTime } = require("luxon");
const footnote = require('markdown-it-footnote');
const wikilinks = require('markdown-it-wikilinks');
const externallink = require('markdown-it-external-link').default;
const backlinks = require("eleventy-plugin-backlinks");
const rss = require("@11ty/eleventy-plugin-rss");
const nav = require("@11ty/eleventy-navigation");
const expandTabs = require('markdown-it-expand-tabs');
const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const EleventyPluginTagCloud = require("eleventy-plugin-tag-cloud");

module.exports = function(eleventyConfig) {
  // Customize Markdown library settings:
  eleventyConfig.amendLibrary("md", mdLib => {
    mdLib
      .set({ linkify: true })
      .use(footnote)
      .use(require('markdown-it-attrs'))
      .use(wikilinks({
        makeAllLinksAbsolute: true,
        baseURL: '/notebook',
        uriSuffix: ''
      }))
      .use(externallink,
        { hosts: ['https://jordan.thirus.me', 'http://localhost:8080'] }
      )
      .use(expandTabs)
  });

  //add plugins
  eleventyConfig.addPlugin(backlinks, { folder: '/notebook' });
  eleventyConfig.addPlugin(rss, {
		type: "rss",
		outputPath: "/feed.xml",
		collection: {
			name: "notebook", // iterate over `collections.posts`
			limit: 0,     // 0 means no limit
		}
	});
  eleventyConfig.addPlugin(nav);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// which file extensions to process
		extensions: "html",

		// Add any other Image utility options here:
    urlPath: '/img/',
		// optional, output image formats
		formats: ["png"],

		// optional, output image widths
		 widths: ["auto"],

		// optional, attributes assigned on <img> override these values.
		defaultAttributes: {
			loading: "lazy",
			decoding: "async",
		},
	});
	eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy('assets');

  eleventyConfig.addNunjucksAsyncShortcode("aiRobots", async function () {
    let disallowedAIRobots = await fetch('https://raw.githubusercontent.com/ai-robots-txt/ai.robots.txt/main/robots.txt')
    return await disallowedAIRobots.text()
  });

  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  });

  // Return all the tags used in a collection
  eleventyConfig.addFilter("getAllTags", collection => {
    let tagSet = new Set();
    for (let item of collection) {
      (item.data.tags || []).forEach(tag => tagSet.add(tag));
    }
    return Array.from(tagSet);
  });

  eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
    return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
  });

  eleventyConfig.addPlugin(EleventyPluginTagCloud);

  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      layouts: "../_layouts",
      data: "../_data",
      input: "content",
      output: "public"
    },
    passthroughFileCopy: true
  }
};