function sqlInjectionGuard(req, res, next) {
  const suspiciousPatterns = [
    /--/, // Single-line comment
    /;/, // Statement separator
    /\/\*/,
    /\*\//, // Multi-line comment start/end
    /xp_cmdshell/i, // Dangerous command to execute OS-level commands
    /exec(\s|\+)+(s|x)p\w+/i, // EXEC xp_cmdshell, sp_configure, etc.
    /drop\s+table/i, // DROP TABLE statement
    /union\s+select/i, // UNION SELECT to merge malicious queries
    /select\s+\*\s+from/i, // SELECT * FROM to fetch all data
    /insert\s+into/i, // INSERT INTO to inject data
    /update\s+\w+\s+set/i, // UPDATE table SET field
    /delete\s+from/i, // DELETE FROM statement
    /cast\(.+as\s+\w+\)/i, // CAST(x AS type) for type manipulation
    /convert\(.+,\s*\w+\)/i, // CONVERT(x, type) for type casting
    /char\(.+?\)/i, // CHAR() to build strings
    /waitfor\s+delay/i, // WAITFOR DELAY to slow down queries
    /information_schema/i, // Access to DB schema information
    /1\s*=\s*1/, // Always-true condition
    /\bor\b\s+\d+\s*=\s*\d+/i, // OR 1=1 pattern
    /\band\b\s+\d+\s*=\s*\d+/i, // AND 1=1 pattern
    /\bnull\b/i, // Use of NULL in logic
  ];

  const checkObject = (obj) => {
    for (const key in obj) {
      const value = String(obj[key]);
      for (const pattern of suspiciousPatterns) {
        if (pattern.test(value)) {
          return true;
        }
      }
    }
    return false;
  };

  if (
    checkObject(req.body) ||
    checkObject(req.query) ||
    checkObject(req.params)
  ) {
    return res.status(400).json({ error: "Malicious Input Detected" });
  }

  next();
}

module.exports = sqlInjectionGuard;
