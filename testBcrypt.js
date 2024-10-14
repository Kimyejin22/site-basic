import bcrypt from 'bcryptjs';

async function testBcrypt() {
    try {
        const password = 'testPassword';
        const hashedPassword = await bcrypt.hash(password, 10);
        const isMatch = await bcrypt.compare(password, hashedPassword);
        
        console.log("Original password:", password);
        console.log("Hashed password:", hashedPassword);
        console.log("Password matches:", isMatch);
    } catch (err) {
        console.error("Bcryptjs test failed:", err.message);
    }
}

testBcrypt();
