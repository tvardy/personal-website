---
title: Understanding the "git add" + "git commit" commands pair
tag: [ git, vcs, IT metaphors ]
image: 
  unsplashId: 1480506132288-68f7705954bd
  class: page-image--alpha page-image--grey
---
Sooner or later all of my students step into learning [Git](//git-scm.com).
It's a no-brainer; I can't really imagine a situation in which a person wanting
to become a programmer (of any programming language(s)) would not need to learn
and use a <accr title="Version Control System">VCS</accr>.
And `git` established its esteemed reputation in this area for good reason.

One thing I have noticed is that roughly one in four of my students will ask me
a question like:

> "Why do I need to do 
>
> `git add`
>
>  command and then follow with the 
>
> `git commit`
>
> ?!
>
> What's the real-life purpose of that?!"

The short answer is: You don't actually have to (but you often should)

The longer answer all comes down to one word: _control_.
<!-- more -->


## The short answer

So the short answer to the aforementioned issue could simply be: Use `git commit -a` instead!
Or if you were regularly using `git commit -m "commit message"`
then probably `git commit -am "commit message"` would be better for you.

OK! So what does the `-a` flag mean? I hear you say.

Git's official [documentation](https://git-scm.com/docs/git-commit#git-commit--a) states:

> **-a**<br>
> **--all**<br>
>  Tell the command to automatically stage files that have been modified and deleted,
>  but new files you have not told Git about are not affected.

Good for us. If we **changed** one or two files (or however many we like) and we'd like to
add them **all** within one commit. 

As long as we'd only want to commit changes made to the files that were previously already
indexed by Git, we could go with the `-a` (or even `-am`) flag.

And that's basically an answer that satisfies my students during their first steps
on their learning path.

And maybe it'd also satisfy you.


## The longer answer

But there's also the longer answer I usually give to my students to help them understand
this common pattern. And it is... a metaphor of online shopping.

Isn't it what gives us _control_ when we're shopping online -- the "view cart" option,
before we really buy anything? ;)

When the students imagine the aforementioned mechanism of working with their source code
as a procedure of buying goods on Amazon, eBay etc. everything becomes clearer.


### Add do cart == git add

Indeed, that's what happens when you use `git add` command (by the way in Git's terms
this is called "staging"). You're taking a file (or even its part) and putting it into
a pool (the basket) of objects you'd eventually like to "take to the till".

You're still able to easily change your mind; remove the items from your cart or exchange
them to other ones.

You're also capable of completely cancel your "shopping" (after checking how much
the total cost would be). I can just leave the collected items and go out of the shop
without consequence.
 
Well, that's exactly what the process of staging files is. And it's much less serious
as the second step.


### Pay == git commit

Yes! When you finally decide to click the "Pay" button that's the moment of your **commitment**
(have you noticed the intended pun here?). You're fully responsible for this decision.

Consequently, that's what your commitment of the work being done on your source code
should be like. Even though this is still something that could be reversed, it doesn't mean
you shouldn't pay attention and do your best.

Thus this is the time you as a developer pledge a part of your changes as done and ready
to be put into the rest of the source code.

Another great advantage of this attitude is the ability of logical separation
of certain changes into separate commits. If you've changed files "x", "y" and "z",
and you know that they all bring a different set of changes, you can consciously
choose to commit e.g. files "x" and "z" together, and then the remaining "y" file separately.

So it's like splitting your shopping into, for instance, private and corporate expenses.

  
### Bonus: Buy now == git commit -am ;)

As a bonus on our metaphorical view on Git commands let's get back to the "Short answer" section.

Can you tell the similarities between clicking "Buy now" button on eBay and calling
`git commit -am "commit message"` command, yourself? ;) 
