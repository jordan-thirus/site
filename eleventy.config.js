const { DateTime } = require("luxon");
const footnote = require('markdown-it-footnote');
const wikilinks = require('markdown-it-wikilinks');
const externallink = require('markdown-it-external-link').default;
const backlinks = require("eleventy-plugin-backlinks");
const rss = require("@11ty/eleventy-plugin-rss");
const nav = require("@11ty/eleventy-navigation");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");


module.exports = function(eleventyConfig) {
  // Customize Markdown library settings:
	eleventyConfig.amendLibrary("md", mdLib => {
		mdLib
      .set({linkify: true})      
      .use(footnote)
      .use(require('markdown-it-attrs'))
      .use(wikilinks({
          makeAllLinksAbsolute: true, 
          baseURL: '/notebook',
          uriSuffix: ''
        }))
      .use(externallink,
        { hosts:['https://jordan.thirus.me', 'http://localhost:8080']}
      )
	});

  //add plugins
  eleventyConfig.addPlugin(backlinks, { folder: '/notebook' });
  eleventyConfig.addPlugin(rss);
  eleventyConfig.addPlugin(nav);
  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: "https://jordan.thirus.me",
    },
  });
  eleventyConfig.addPassthroughCopy('assets');

  eleventyConfig.addNunjucksAsyncShortcode("aiRobots", async function() {
    let disallowedAIRobots = await fetch('https://raw.githubusercontent.com/ai-robots-txt/ai.robots.txt/main/robots.txt')
    return await disallowedAIRobots.text()
   });
   	
   eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
	});

  // Return all the tags used in a collection
	eleventyConfig.addFilter("getAllTags", collection => {
		let tagSet = new Set();
		for(let item of collection) {
			(item.data.tags || []).forEach(tag => tagSet.add(tag));
		}
		return Array.from(tagSet);
	});

   eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
	});

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