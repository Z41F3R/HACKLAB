# SQL Injection Básico

## ¿Qué es SQL Injection?

**SQL Injection (SQLi)** es una vulnerabilidad de seguridad que permite a un atacante interferir con las consultas que una aplicación realiza a su base de datos. Ocurre cuando los datos proporcionados por el usuario se concatenan directamente en una consulta SQL sin la debida sanitización.

---

## 1. Ejemplo Vulnerable

### Código vulnerable (PHP)

```php
<?php
$id = $_GET['id'];
$query = "SELECT * FROM usuarios WHERE id = $id";
$result = mysqli_query($conn, $query);
?>
```
```python
SELECT * FROM users WHERE username = 'admin';
```
