---
title: Understanding the "git add" + "git commit" commands pair
data: 2018-08-18
---
Sooner or later all of my students step into learning [Git](//git-scm.com).
It's pretty obvious; I can't really imagine situation in which a person wanting
to become a programmer (of any programming language(s)) would not need to learn
and use a <accr title="Version Control System">VCS</accr>.
And `git` gained its high position in this area for a reason.

One thing I noticed is that roughly one on four of my students would asked me
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
> What's the real life purpose of that?!"

The short answer is: You don't actually have to (but you often should)

The longer answer is all based on one word: _control_.
<!-- more -->


## The short answer

So the short answer to the above mentioned issue could simply be: Use `git commit -a` instead!
Or if you were regularly using `git commit -m "commit message"` then probably `git commit -am "commit message"`
would do better for you.

OK! So what does the `-a` flag mean? I hear you say.

Git's official [documentation](https://git-scm.com/docs/git-commit#git-commit--a) states:

> **-a**<br>
> **--all**<br>
>  Tell the command to automatically stage files that have been modified and deleted,
>  but new files you have not told Git about are not affected.

Good for us. If we **changed** one or two files (or how many we'd like) and we'd like to
add them **all** within one commit. 

As long as we'd only want to commit changes made to the files that were previously already
indexed by Git, we could go with the `-a` (or even `-am`) flag.

And that's basically an aswer that satisfies my students on their first steps on their learning path.

And maybe it'd also satisfy you.


## The longer answer
