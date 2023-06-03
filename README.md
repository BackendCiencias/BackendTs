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

<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>Pay Month Pension</code></summary>

#### Link
```
secretary/pension
```

#### Request

```
{
  "idStudent": "idStudent",
  "month": "somevalue"
}
```

#### Responses

<details>
<summary><code>Status 200</code> <code><b>/</b></code> <code>Success</code></summary>

```
{
  "date": "timestamp",
  "amount": number,
  "student": "idStudent",
  "category": "idCategory",
  "_id": "647a88e08a526c326d8dd4ef"
}
```
</details></details>

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
</details></details>

---

<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>Get By DNI Student</code></summary>

#### Link
```
/student/dni/
```

#### Request
```
{
  "dni": "somevalue"
}
```

#### Responses

<details>
<summary><code>Status 200</code> <code><b>/</b></code> <code>Success</code></summary>

```
{
  STUDENT_MODEL
}
```
</details></details>

---

<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>Get By ID Student</code></summary>

#### Link
```
/api/student/:id
```

#### Responses

<details>
<summary><code>Status 200</code> <code><b>/</b></code> <code>Success</code></summary>

```
{
  STUDENT_MODEL
}
```
</details></details>

---



<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>Get All Students</code></summary>

#### Link
```
/api/student
```

#### Responses

<details>
<summary><code>Status 200</code> <code><b>/</b></code> <code>Success</code></summary>

```
[
  STUDENT_MODEL
]
```
</details></details>

---