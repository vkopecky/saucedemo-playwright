# Test Case Documentation – SauceDemo Playwright Suite
# Dokumentácia testovacích prípadov – SauceDemo Playwright Suite

**System Under Test / Testovaný systém:** https://www.saucedemo.com  
**Framework:** Playwright | **Language / Jazyk:** JavaScript  
**Browsers / Prehliadače:** Chromium  
**Test data / Testovacie dáta:** `fixtures/saucedemo/users.js`  
**Selectors / Selektory:** `page-object-modeling/saucedemo-selectors.js`

---

## TC01 – Login Functionality / Funkčnosť prihlásenia
**File / Súbor:** `tests/saucedemo/01-login.spec.js`

### Why essential / Prečo je to dôležité
**EN:** Authentication is the entry point to the entire application. If login is broken, 100% of users are locked out and no other feature is accessible.  
**SK:** Prihlásenie je vstupná brána do celej aplikácie. Ak prihlásenie nefunguje, 100 % používateľov nemá prístup a žiadna iná funkcionalita nie je dostupná.

---

### [standard_user / problem_user / performance_glitch_user / error_user / visual_user]  
### 01-A: Successful login navigates to inventory page

**EN:**
1. Open the login page (`/`)
2. Fill in a valid username from `VALID_USERS` list and password `secret_sauce`
3. Click the **Login** button
4. **Assert:** URL changes to `/inventory.html`
5. **Assert:** No error message is visible

**SK:**
1. Otvorí prihlasovaciu stránku (`/`)
2. Vyplní platné meno zo zoznamu `VALID_USERS` a heslo `secret_sauce`
3. Klikne na tlačidlo **Login**
4. **Overenie:** URL sa zmení na `/inventory.html`
5. **Overenie:** Chybová správa nie je viditeľná

> ✅ Test runs for each valid user separately (data-driven)  
> ✅ Test beží pre každého platného používateľa zvlášť (data-driven prístup)

---

### [locked_out_user]
### 01-B: Locked-out user sees error and stays on login page

**EN:**
1. Open the login page
2. Fill in `locked_out_user` and password `secret_sauce`
3. Click **Login**
4. **Assert:** URL stays at `/`
5. **Assert:** Error message is visible and contains "Sorry, this user has been locked out"

**SK:**
1. Otvorí prihlasovaciu stránku
2. Vyplní `locked_out_user` a heslo `secret_sauce`
3. Klikne na **Login**
4. **Overenie:** URL zostáva na `/`
5. **Overenie:** Chybová správa je viditeľná a obsahuje "Sorry, this user has been locked out"

---

### [unknown_user]
### 01-C: Invalid credentials show a generic mismatch error

**EN:**
1. Open the login page
2. Fill in `unknown_user` and `wrong_password`
3. Click **Login**
4. **Assert:** URL stays at `/`
5. **Assert:** Error message contains "Username and password do not match"

**SK:**
1. Otvorí prihlasovaciu stránku
2. Vyplní `unknown_user` a `wrong_password`
3. Klikne na **Login**
4. **Overenie:** URL zostáva na `/`
5. **Overenie:** Chybová správa obsahuje "Username and password do not match"

---

## TC02 – Product Listing & Sorting / Zoznam produktov a triedenie
**File / Súbor:** `tests/saucedemo/02-product-sorting.spec.js`

### Why essential / Prečo je to dôležité
**EN:** Customers rely on sorting to find products matching their budget. Broken sorting silently delivers wrong results and directly hurts conversion rates.  
**SK:** Zákazníci využívajú triedenie na nájdenie produktov podľa ceny. Nefunkčné triedenie zobrazuje nesprávne výsledky bez upozornenia a priamo znižuje konverzný pomer.

---

### [standard_user] 02-A: Inventory page shows exactly 6 products

**EN:**
1. Navigate to `/inventory.html` (already logged in via session)
2. **Assert:** Exactly **6** product cards are visible

**SK:**
1. Prejde na `/inventory.html` (prihlásený cez session)
2. **Overenie:** Presne **6** kariet produktov je viditeľných

---

### [standard_user] 02-B: Sort by "Price (low to high)" produces ascending order

**EN:**
1. Navigate to inventory page
2. Select **"Price (low to high)"** from the sort dropdown
3. Read all displayed prices
4. **Assert:** Each price is greater than or equal to the previous one
5. **Assert:** First price is `$7.99`, last price is `$49.99`

**SK:**
1. Prejde na inventárnu stránku
2. Vyberie **"Price (low to high)"** z dropdown menu
3. Načíta všetky zobrazené ceny
4. **Overenie:** Každá cena je väčšia alebo rovnaká ako predchádzajúca
5. **Overenie:** Prvá cena je `$7.99`, posledná je `$49.99`

---

### [standard_user] 02-C: Sort by "Name (Z to A)" produces reverse alphabetical order

**EN:**
1. Navigate to inventory page
2. Select **"Name (Z to A)"** from the sort dropdown
3. Read all displayed product names
4. **Assert:** Each name is alphabetically before or equal to the previous (descending order)
5. **Assert:** First product is `Test.allTheThings() T-Shirt (Red)`, last is `Sauce Labs Backpack`

**SK:**
1. Prejde na inventárnu stránku
2. Vyberie **"Name (Z to A)"** z dropdown menu
3. Načíta všetky názvy produktov
4. **Overenie:** Každý názov je abecedne pred alebo rovnaký ako predchádzajúci (zostupné poradie)
5. **Overenie:** Prvý produkt je `Test.allTheThings() T-Shirt (Red)`, posledný `Sauce Labs Backpack`

---

## TC03 – Shopping Cart: Add & Remove Items / Nákupný košík: Pridanie a odstránenie
**File / Súbor:** `tests/saucedemo/03-shopping-cart.spec.js`

### Why essential / Prečo je to dôležité
**EN:** The shopping cart is the core e-commerce mechanism. Wrong badge counts, missing items, or broken removal leads to abandoned purchases.  
**SK:** Nákupný košík je základný mechanizmus e-commerce. Nesprávny počet na ikone, chýbajúce položky alebo nefunkčné odstránenie vedú k opusteniu nákupu.

---

### [standard_user] 03-A: Adding two products updates cart badge to "2"

**EN:**
1. Navigate to inventory page
2. Click **Add to cart** for Sauce Labs Backpack
3. **Assert:** Cart badge shows `1`
4. Click **Add to cart** for Sauce Labs Bike Light
5. **Assert:** Cart badge shows `2`

**SK:**
1. Prejde na inventárnu stránku
2. Klikne na **Add to cart** pre Sauce Labs Backpack
3. **Overenie:** Ikona košíka zobrazuje `1`
4. Klikne na **Add to cart** pre Sauce Labs Bike Light
5. **Overenie:** Ikona košíka zobrazuje `2`

---

### [standard_user] 03-B: Cart page shows correct item names and prices

**EN:**
1. Add Sauce Labs Bolt T-Shirt and Sauce Labs Onesie to cart
2. Navigate to `/cart.html`
3. **Assert:** Exactly 2 items in cart
4. **Assert:** Both product names visible
5. **Assert:** Prices `$15.99` and `$7.99` visible

**SK:**
1. Pridá Sauce Labs Bolt T-Shirt a Sauce Labs Onesie do košíka
2. Prejde na `/cart.html`
3. **Overenie:** Presne 2 položky v košíku
4. **Overenie:** Oba názvy produktov sú viditeľné
5. **Overenie:** Ceny `$15.99` a `$7.99` sú viditeľné

---

### [standard_user] 03-C: Removing one item from cart leaves the other intact

**EN:**
1. Add two products, navigate to cart
2. Click **Remove** for Sauce Labs Backpack
3. **Assert:** Cart contains exactly 1 item
4. **Assert:** Backpack is no longer visible
5. **Assert:** Bike Light is still visible
6. **Assert:** Cart badge shows `1`

**SK:**
1. Pridá dva produkty, prejde do košíka
2. Klikne na **Remove** pri Sauce Labs Backpack
3. **Overenie:** Košík obsahuje presne 1 položku
4. **Overenie:** Backpack už nie je viditeľný
5. **Overenie:** Bike Light stále viditeľný
6. **Overenie:** Ikona košíka zobrazuje `1`

---

### [standard_user] 03-D: Removing the last item hides the cart badge

**EN:**
1. Add Sauce Labs Onesie, verify badge shows `1`
2. Navigate to cart, click **Remove**
3. **Assert:** Cart contains 0 items
4. **Assert:** Cart badge is not visible at all

**SK:**
1. Pridá Sauce Labs Onesie, overí že ikona zobrazuje `1`
2. Prejde do košíka, klikne **Remove**
3. **Overenie:** Košík obsahuje 0 položiek
4. **Overenie:** Ikona košíka nie je vôbec viditeľná

---

## TC04 – End-to-End Checkout Flow / Kompletný checkout proces
**File / Súbor:** `tests/saucedemo/04-checkout.spec.js`

### Why essential / Prečo je to dôležité
**EN:** The checkout flow is the critical business path. One broken step means zero revenue. Customer data is randomised with Faker on every run to catch edge cases with special characters, name lengths, or varied postal codes.  
**SK:** Checkout je kritická obchodná cesta. Jediný pokažený krok = nulové tržby. Zákaznícke dáta sú generované cez Faker pri každom spustení – zachytí krajné prípady so špeciálnymi znakmi, rôznymi dĺžkami mien alebo PSČ.

---

### [standard_user] 04-A: Full checkout flow ends with order confirmation

**EN:**
1. Navigate to inventory, add Sauce Labs Backpack, verify badge `1`
2. Go to cart, verify item visible, click **Checkout**
3. Fill in random customer data (Faker): First Name, Last Name, Postal Code
4. Click **Continue** → lands on `/checkout-step-two.html`
5. **Assert:** Item name visible in overview
6. **Assert:** Subtotal shows `$29.99`, tax visible, total visible
7. Click **Finish**
8. **Assert:** URL is `/checkout-complete.html`
9. **Assert:** Heading "Thank you for your order!" visible
10. **Assert:** "Your order has been dispatched" message visible

**SK:**
1. Prejde na inventár, pridá Sauce Labs Backpack, overí ikonu `1`
2. Prejde do košíka, overí položku, klikne **Checkout**
3. Vyplní náhodné zákaznícke údaje (Faker): meno, priezvisko, PSČ
4. Klikne **Continue** → pristane na `/checkout-step-two.html`
5. **Overenie:** Názov produktu viditeľný v prehľade
6. **Overenie:** Medzisúčet `$29.99`, daň viditeľná, celková suma viditeľná
7. Klikne **Finish**
8. **Overenie:** URL je `/checkout-complete.html`
9. **Overenie:** Nadpis "Thank you for your order!" je viditeľný
10. **Overenie:** Správa "Your order has been dispatched" je viditeľná

---

### [standard_user] 04-B: Empty checkout form shows validation error

**EN:**
1. Add product, go to cart, click **Checkout**
2. Click **Continue** without filling any field
3. **Assert:** Error message visible: "First Name is required"
4. **Assert:** URL stays at `/checkout-step-one.html`

**SK:**
1. Pridá produkt, prejde do košíka, klikne **Checkout**
2. Klikne **Continue** bez vyplnenia akéhokoľvek poľa
3. **Overenie:** Chybová správa: "First Name is required"
4. **Overenie:** URL zostáva na `/checkout-step-one.html`

---

## TC05 – Logout & Session Protection / Odhlásenie a ochrana session
**File / Súbor:** `tests/saucedemo/05-logout.spec.js`

### Why essential / Prečo je to dôležité
**EN:** Logout is a security-critical feature. After logout, protected pages must not be accessible. An unprotected session lets anyone access a previous user's account.  
**SK:** Odhlásenie je bezpečnostne kritická funkcia. Po odhlásení nesmú byť chránené stránky dostupné. Neochránená session umožňuje komukoľvek prístup k účtu predchádzajúceho používateľa.

---

### [standard_user] 05-A: Logout via hamburger menu redirects to login page

**EN:**
1. Navigate to `/inventory.html`
2. Click the hamburger menu (☰)
3. Wait for menu to open, click **Logout**
4. **Assert:** URL is `/`
5. **Assert:** Login button is visible

**SK:**
1. Prejde na `/inventory.html`
2. Klikne na hamburger menu (☰)
3. Počká na otvorenie menu, klikne **Logout**
4. **Overenie:** URL je `/`
5. **Overenie:** Tlačidlo Login je viditeľné

---

### [standard_user] 05-B: Accessing /inventory.html after logout redirects to login

**EN:**
1. Logout as above
2. Directly navigate to `/inventory.html` (bypass attempt)
3. **Assert:** URL redirects back to `/`
4. **Assert:** Login button is visible (not the inventory page)

**SK:**
1. Odhlási sa ako vyššie
2. Priamo naviguje na `/inventory.html` (pokus o obídenie)
3. **Overenie:** URL presmeruje späť na `/`
4. **Overenie:** Tlačidlo Login je viditeľné (nie inventárna stránka)

---

## TC06 – Product Detail Page / Stránka detailu produktu
**File / Súbor:** `tests/saucedemo/06-product-detail.spec.js`

### Why essential / Prečo je to dôležité
**EN:** The detail page is where purchase decisions are made. A mismatch between the listing price/name and the detail page is a critical data integrity bug.  
**SK:** Stránka detailu je miesto, kde sa robia nákupné rozhodnutia. Nesúlad medzi cenou/názvom v zozname a na stránke detailu je kritická chyba integrity dát.

---

### [standard_user] 06-A: Clicking a product navigates to detail with correct info

**EN:**
1. Navigate to inventory
2. Click on product name "Sauce Labs Backpack"
3. **Assert:** URL contains `/inventory-item.html`
4. **Assert:** Product name on detail page is "Sauce Labs Backpack"
5. **Assert:** Price is `$29.99`
6. **Assert:** Description is not empty

**SK:**
1. Prejde na inventár
2. Klikne na názov produktu "Sauce Labs Backpack"
3. **Overenie:** URL obsahuje `/inventory-item.html`
4. **Overenie:** Názov produktu na stránke detailu je "Sauce Labs Backpack"
5. **Overenie:** Cena je `$29.99`
6. **Overenie:** Popis nie je prázdny

---

### [standard_user] 06-B: Adding to cart from detail page updates cart badge

**EN:**
1. Open detail page of "Sauce Labs Bike Light"
2. **Assert:** Cart badge not visible
3. Click **Add to cart**
4. **Assert:** Cart badge shows `1`
5. **Assert:** Remove button is visible
6. **Assert:** Add to cart button is no longer visible

**SK:**
1. Otvorí stránku detailu "Sauce Labs Bike Light"
2. **Overenie:** Ikona košíka nie je viditeľná
3. Klikne **Add to cart**
4. **Overenie:** Ikona košíka zobrazuje `1`
5. **Overenie:** Tlačidlo Remove je viditeľné
6. **Overenie:** Tlačidlo Add to cart už nie je viditeľné

---

### [standard_user] 06-C: "Back to Products" button returns to inventory

**EN:**
1. Open detail page of "Sauce Labs Onesie"
2. Click **Back to Products** button
3. **Assert:** URL contains `/inventory.html`
4. **Assert:** Page title is "Products"

**SK:**
1. Otvorí stránku detailu "Sauce Labs Onesie"
2. Klikne na tlačidlo **Back to Products**
3. **Overenie:** URL obsahuje `/inventory.html`
4. **Overenie:** Nadpis stránky je "Products"

---

## TC07 – Persistent Cart State / Perzistentný stav košíka
**File / Súbor:** `tests/saucedemo/07-persistent-cart.spec.js`

### Why essential / Prečo je to dôležité
**EN:** If a user adds items and then refreshes or navigates away, their cart must survive. Losing cart contents on reload means lost sales and a frustrating user experience.  
**SK:** Ak používateľ pridá položky a potom obnoví stránku alebo naviguje preč, jeho košík musí zostať zachovaný. Strata obsahu košíka pri obnovení stránky znamená stratu predaja a zlý zážitok pre používateľa.

---

### [standard_user] 07-A: Cart items and badge persist after page reload

**EN:**
1. Navigate to inventory, add Sauce Labs Backpack and Sauce Labs Fleece Jacket
2. **Assert:** Cart badge shows `2`
3. Reload the page (`F5`)
4. **Assert:** Cart badge still shows `2`
5. Navigate to cart
6. **Assert:** Both items still present in cart

**SK:**
1. Prejde na inventár, pridá Sauce Labs Backpack a Sauce Labs Fleece Jacket
2. **Overenie:** Ikona košíka zobrazuje `2`
3. Obnoví stránku (`F5`)
4. **Overenie:** Ikona košíka stále zobrazuje `2`
5. Prejde do košíka
6. **Overenie:** Obe položky sú stále v košíku

---

### [standard_user] 07-B: Cart persists after navigating away and back

**EN:**
1. Navigate to inventory, add Sauce Labs Onesie
2. **Assert:** Cart badge shows `1`
3. Navigate to cart page, then press **Back** in browser
4. **Assert:** Cart badge still shows `1`
5. **Assert:** Remove button for Onesie is visible (item still in cart state)

**SK:**
1. Prejde na inventár, pridá Sauce Labs Onesie
2. **Overenie:** Ikona košíka zobrazuje `1`
3. Prejde na stránku košíka, potom klikne **Späť** v prehliadači
4. **Overenie:** Ikona košíka stále zobrazuje `1`
5. **Overenie:** Tlačidlo Remove pre Onesie je viditeľné (stav košíka zachovaný)

---

## Summary / Súhrn

| TC | File | Tests | Essential because / Dôležité pretože |
|----|------|-------|--------------------------------------|
| TC01 | 01-login.spec.js | 7 | Entry point / Vstupná brána |
| TC02 | 02-product-sorting.spec.js | 3 | Silent failures / Tiché zlyhania |
| TC03 | 03-shopping-cart.spec.js | 4 | Core mechanism / Základný mechanizmus |
| TC04 | 04-checkout.spec.js | 2 | Revenue path / Cesta k tržbám |
| TC05 | 05-logout.spec.js | 2 | Security / Bezpečnosť |
| TC06 | 06-product-detail.spec.js | 3 | Data integrity / Integrita dát |
| TC07 | 07-persistent-cart.spec.js | 2 | UX / Používateľský zážitok |
| **Total** | | **23** | |

