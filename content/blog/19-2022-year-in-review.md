---
title: 2022 Year in Review
slug: 2022-year-in-review
description: A review of the year 2022, the opportunities, the gratitude and what I'm looking forward to in the new year.
date: 2023-01-04
params:
  featured: true
  external: false
  ogImagePath: /images/blog/2022-year-in-review-cover.png
---

![2022 Year In Review Cover](/images/blog/2022-year-in-review-cover.png)

2022 was an interesting year. I got out of the lockdown mindset. I started traveling. I started waking up early. I started exercising every day. I started seeing past the Twitter bubble. I learnt to lead. I learnt to manage my time. Most importantly I learnt to prioritize and get things done.

- [I joined The 5AM Club](#i-joined-the-5am-club)
- [Lots of GraphQL](#lots-of-graphql)
- [Advocate for Keystone](#advocate-for-keystone)
- [Speaking and Community](#speaking-and-community)
- [Shipit mindset](#shipit-mindset)
  - [I shipped Pocketnotes](#i-shipped-pocketnotes)
  - [I shipped Blogster](#i-shipped-blogster)

## I joined The 5AM Club

Towards the end of the year I switched my daily routine and started waking up at 5am every day. This has drastically changed my routine and my morning productivity has skyrocketed ever since. Exercising, reading, emails, notifications and planning my day all done before 8am. This gives me the opportunity to start my work early and get most of my day's work done before 10am, before all the notifications, conversations and meetings begin. The 2 hour block between 8am and 10am has become my high output focus hours.

Another unexpected positive impact of waking up early is the evening focus block. Since the exercise hour is in the morning now, I have a solid 2-3 hours of non-intrusive focus time for my side projects in the evening. This helps me make consistent progress and stay motivated to keep going.

## Lots of GraphQL

I spent the majority of my time in the early half of the year helping architect the frontend stack of a data-heavy platform where I mostly worked on GraphQL and the tools around it. This helped me build a solid mental model of GraphQL, how it works, the problems it solves, and most importantly when it helps and when it is an overkill.

My takeaway —

> If someone tells you to use GraphQL because it solves the over-fetching problem, don't believe them, that's not a good reason to use GraphQL. And if someone tells you that GraphQL is an overkill, don't believe them either, they probably haven't yet seen the problems GraphQL solves. GraphQL is a great tool but it has its complexities which deem it an overkill for most of the use cases out there.

## Advocate for Keystone

[Keystone](https://twitter.com/KeystoneJS) is my favourite tool to build backends. I have built multiple API platforms with Keystone and often talk about how good the developer experience is. Towards the second half of year I joined the Keystone team as a **Developer Advocate** to help build a relationship with the community and spread the word. And I gotta say, it's going great. I truly enjoy working in this problem space and have big plans for the new year. **2023 is going to be the year of Keystone and I can't wait.**

## Speaking and Community

The meetup scene is slowly picking up post lockdown. I went to a few in-person meetups towards the end of the year and it was great. It's always nice catching with friends in the web community. And oh, I gave a lightning talk at [WDYK Sydney '22](/talks/wdyk-sydney-rapid-iteration).

Looking forward to be at more meetups and conferences in 2023, both on the stage and in the audience.

## Shipit mindset

Towards the end of the year, I started seeing past the Twitter bubble and hit the reset button on my ambitions. I asked myself

> If Twitter or any other web dev community space did not exist, what would I want to do with my career?

The answer to that question was obvious to me. I want to ship. I want to dissect a problem space, build expertise, ship code and maybe document my learning process along the way.

So I started shipping.

- [I shipped Pocketnotes](#i-shipped-pocketnotes)
- [I shipped Blogster](#i-shipped-blogster)

### I shipped Pocketnotes

Announcement post: [Introducing my side project — Pocketnotes](https://twitter.com/flexdinesh/status/1587567793712816130).

The whole idea was born around the time Vercel announced [OG Image Generation](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation) at the edge. I have been meaning to play around with [Edge Runtime](https://vercel.com/docs/concepts/functions/edge-functions) to build a mental model around data at the edge and the announcement of the `@vercel/og` library came at the right time. I was also reading up a bit about [Upstash Redis](https://upstash.com) at the time and used that as a data source at the edge for Pocketnotes. All in all, I learnt plenty about rendering, caching and data at the edge by building [Pocketnotes](https://pocketnotes.app).

### I shipped Blogster

Announcement post: [Introducing Blogster](https://twitter.com/flexdinesh/status/1605685191703687168).

> Astro is a web framework for building fast, content-focused websites.

[Astro](https://astro.build) v1 was [announced in August 2022](https://astro.build/blog/astro-1). I took it for a spin and immediately liked Astro's well laid out opinions and abstractions. The component model, web components, prerendering, ssr, it all just clicked. It seemed like the perfect tool to build static content websites. After working with it for a few months I am now convinced that Astro is in fact the perfect choice for building content driven static websites. I wanted to rebuild my blog with Astro. But this time I wanted to experiment with all the best practices out there for building performant personal blogs. And I did. I open sourced everything I learned as [Blogster](https://github.com/flexdinesh/blogster), a collection of community themes for Astro.

I used this opportunity to experiment with [Markdoc](https://markdoc.dev) and I am now convinced that Markdoc is the best tool out there to work with markdown in code. Blogster's markdown is powered by Markdoc.

I have also been meaning to learn and build CLIs like [create-next-app](https://nextjs.org/docs/api-reference/create-next-app) and [create-react-app](https://create-react-app.dev) for a while now. So I did that too for Blogster. Blogster has a CLI to get started quickly in one command [create-blogster](https://github.com/flexdinesh/blogster#get-started).

All in all, I learnt a great deal building the four different themes for Blogster. I got a few ideas lined up already and I am going to find time to do more in the space.

## Wrapping it up

2022 was a good year overall. Most of the things I got done in the year happened after October but that's part of the process. I am glad I got back on my wheels towards the end of the year. Nothing but gratitude for the opportunities and the lessons. I got big plans for 2023 and can't wait to go get it. Onward and upward!
