# Backend Documentation
## APP 
```
https://backend-ts.vercel.app/api/
```
## Secretary
<!-- Secretary Signin -->
---
<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>Sign in Secretary</code></summary>

#### Link
```
/auth/secretary/signin
```

#### Request

```
{
  "email": "somevalue@cienciasperu.edu.pe",
  "password": "some_confidencial_value"
}
```

#### Responses

<details>
<summary><code>Status 200</code> <code><b>/</b></code> <code>Success</code></summary>

```
{
  "token": "JSON Web Token",
  "data":
  {
    "email": "somevaluel@ciencia.edu.pe",
    "names":
    {
      "name1": "somevalue",
      "surname1": "somevalue",
      "surname2": "somevalue",
    },
    "_id": "somevalue"
  }
}
```

</details>
</details>

---
<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>Register New Student</code></summary>

#### Link
```
/student/signup
```

#### Request

```
{
  "names": 
  { 
    "name1":        "somevalue",
    "name2":        "somevalue",
    "surname1":     "somevalue",
    "surname2":     "somevalue" 
  },
  "genre":          "somevalue",
  "dni":            "somevalue",
  "nationality":    "somevalue",
  "address":        "somevalue",
  "birth":          "date",
  "phone":          number,
  "origin":         "somevalue",
  "grade":          "Grade",
  "collegue":       "School Name",
  "pensions": 
  {
    "admission":    number,
    "tuition":      number,
    "march":        number,
    "april":        number,
    "may":          number,
    "june":         number,
    "july":         number,
    "august":       number,
    "september":    number,
    "october":      number,
    "november":     number,
    "december":     number
  }
}
```

#### Responses

<details>
<summary><code>Status 200</code> <code><b>/</b></code> <code>Success</code></summary>

```
{
  "email":     "generated",
  "password":  "generated"
}
```

</details>

<details>
<summary><code>Status 500</code> <code><b>/</b></code> <code> Invalid Token (could be expired)</code></summary>

```
{
  "error": "ERROR_VERIFICATION_TOKEN",
}
```

</details>
</details>

---

## Student
<!-- Secretary Signin -->
---
<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>Sign in Student</code></summary>

#### Link
```
/student/signin
```

#### Request

```
{
  "email": "somevalue@cienciasperu.edu.pe",
  "password": "some_confidencial_value"
}
```

#### Responses

<details>
<summary><code>Status 200</code> <code><b>/</b></code> <code>Success</code></summary>

```
{
  "token": "JSON Web Token",
  "data":
  {
    "email": "somevaluel@ciencia.edu.pe",
    "names":
    {
      "name1": "somevalue",
      "surname1": "somevalue",
      "surname2": "somevalue",
    },
    "_id": "somevalue"
  }
}
```