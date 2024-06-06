MIT License

Copyright (c) 2024 Herasium

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

# Blockcoin

v3 Written in Svelte with Sveltekit

Tools used:
- Firebase
- Svelte
- Sveltekit (routing, etc.)
- Nodemail
- UUID

## Self-hosting Instructions

These instructions will help you selfhost Blockcoin, so read them carefully and follow along!

1. Fork the repository
```sh
git clone <...>
```

2. Install dependencies
```sh
cd <repo> && npm i
```

3. Configure the required files
   To do this, navigate to `./src/lib/server/creds/firebase.json` and fill it with your Firebase data.

4. Copy and host the code that you'll find in my public repos, including bc_lang, bc_post and bc_email, with your own credentials in lib/server/creds/keys.json in this formt: 
```json
{
    "stats":"",
    "lang":"",
    "email":""
} 

```

5. Run the dev server or build for production
```sh
npm run dev # or "npm run build"
```

Have fun and report any bugs please :)

Made with ❤️ by @Hera
(Better README made by @LolzTheDev)

