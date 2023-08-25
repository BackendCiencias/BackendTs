# Backend Documentation
## APP 
```
https://backend-ts.vercel.app/api/
```
## Secretary
<!-- Secretary Signin -->

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

#### Response - Success

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
    "_id": "somevalue",
    "rol": []
  }
}
```

</details>
</details>

---
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

#### Response

<details>
<summary><code>Status 200</code> <code><b>/</b></code> <code> Success </code></summary>

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
---
<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>Register New Assistant</code></summary>

#### Link
```
/assistant/signup
```

#### Request

```
{
  "names": 
  { 
    "name1": "            somevalue",
    "name2": "            somevalue",
    "surname1": "         somevalue",
    "surname2": "         somevalue" 
  },
  "genre": "              somevalue",
  "dni": "                somevalue",
  "nationality": "        somevalue",
  "address": "            somevalue",
  "birth": "2002-08-11",
  "phone":                number,
  "payments": {
    "march":              number,
    "april":              number,
    "may":                number,
    "june":               number,
    "july":               number,
    "august":             number,
    "september":          number,
    "october":            number,
    "november":           number,
    "december":           number
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
---

## Student
<!-- Secretary Signin -->
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
---

<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>Get By Param Id Student</code></summary>

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
---

<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>Get By Id Student</code></summary>

#### Link
```
/api/student/id
```

#### Request

```
{
  "student_id": "id"
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
---


## Assitant(Auxiliar)
<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>Sign in Assistant</code></summary>

#### Link
```
/assistant/signin
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
---

<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>Create Attendance</code></summary>

#### Link
```
/attendance/createatt
```

#### Request
<details>
<summary><code>Normal</code> <code><b>/</b></code> <code>Can be Empty</code></summary>

```
{
}
```
</details>
<details>
<summary><code>Especial</code> <code><b>/</b></code> <code>Required</code></summary>

```
{
  "timeLimit": "2023-06-10T15:00:00.633Z",
  "description": "somevalue",
  "type": "E"
}
```
</details>

#### Responses

<details>
<summary><code>Status 200</code> <code><b>/</b></code> <code>Success</code></summary>

```
{
  "code": "day/month/fullYear",
  "description": "somevalue",
  "type": "E",
  "timeLimit": "Date",
  "_id": "648736d007d5b0ae51c4afff",
}
```
</details>

<details>
<summary><code>Status 400</code> <code><b>/</b></code> <code>Failed</code></summary>

```
{
  "error": "ERROR_ALREADY_CREADTED_ATTENDANCE"
}
```
</details></details>

---
---

<details>
 <summary><code>POST</code> <code><b>/</b></code> <code>Student Attendance</code></summary>

#### Link
```
/attendance/studentAtt
```

#### Request
```
{
  "dni": "somevalue",
}
```


#### Responses

<details>
<summary><code>Status 200</code> <code><b>/</b></code> <code>Success</code></summary>

```
{
  "time": "Date", 
  "state": "A: temprano, B: tarde, C: falta"
}
{
  "error": "ERROR_ALREADY_CREADTED_ATTENDANCE"
}
```
</details>
</details>

---
--- 


<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>Today Attendance</code></summary>

#### Link
```
/attendance/today
```

#### Responses

<details>
<summary><code>Status 200</code> <code><b>/</b></code> <code>Success</code></summary>

```
[
  {
    "_id": "somevalue",
    "code": "day/month/year",
    "type": "N",
    "timeLimit": "date",
  }
]
```
</details></details>