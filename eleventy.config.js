import BacklinksPlugin from "eleventy-plugin-backlinks";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation"
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight"
import EleventyPluginTagCloud from "eleventy-plugin-tag-cloud"
import fontAwesomePlugin from "@11ty/font-awesome"
import { tags, minMaxHtml, dateFilters, tailwindSass } from 'eleventy-shared-plugins';
import configureMarkdown from "./_11ty/markdown-it.js";

export default async function(eleventyConfig) {
  eleventyConfig.addPlugin(configureMarkdown)

  //add plugins
  eleventyConfig.addPlugin(BacklinksPlugin, { folder: '/notebook' });
  eleventyConfig.addPlugin(feedPlugin, {
		type: "rss",
		outputPath: "/feed.xml",
		collection: {
			name: "notes", // iterate over `collections.posts`
			limit: 0,     // 0 means no limit
		},
    metadata: {
      title: "One Notebook",
      "subtitle": "Jordan Thirus' notes",
      base: "https://jordan.thirus.me",
      language: "en",
      author: {
        name: "Jordan Thirus",
      }
    }
	});
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
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
  eleventyConfig.addPlugin(fontAwesomePlugin, {
    defaultAttributes: {
			class: "fa11ty-icon"
		}
  }); 

  eleventyConfig.addNunjucksAsyncShortcode("aiRobots", async function () {
    let disallowedAIRobots = await fetch('https://raw.githubusercontent.com/ai-robots-txt/ai.robots.txt/main/robots.txt')
    return await disallowedAIRobots.text()
  });

  eleventyConfig.addPlugin(EleventyPluginTagCloud);
  eleventyConfig.addPlugin(minMaxHtml);
  eleventyConfig.addPlugin(tags);
  eleventyConfig.addPlugin(dateFilters);
  eleventyConfig.addPlugin(tailwindSass);
};

export const config = {
  markdownTemplateEngine: "njk",
  htmlTemplateEngine: "njk",
  dir: {
    includes: "../_includes",
    layouts: "../_layouts",
    data: "../_data",
    input: "content",
    output: "public"
  },
  passthroughFileCopy: true
}