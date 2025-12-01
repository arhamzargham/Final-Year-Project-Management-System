import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const checkDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB\n');

    // Get all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📊 Collections in database:');
    collections.forEach(col => console.log(`   - ${col.name}`));
    console.log('');

    // Count documents in each collection
    console.log('📈 Document counts:');
    for (const col of collections) {
      const count = await mongoose.connection.db.collection(col.name).countDocuments();
      console.log(`   ${col.name}: ${count} documents`);
    }
    console.log('');

    // List all users
    const users = await User.find({}, 'name email role studentId isVerified').lean();
    console.log('👥 Users in database:');
    console.log('═══════════════════════════════════════════════════');
    users.forEach(user => {
      console.log(`📧 ${user.email}`);
      console.log(`   Name: ${user.name}`);
      console.log(`   Role: ${user.role}`);
      if (user.studentId) console.log(`   Student ID: ${user.studentId}`);
      console.log(`   Verified: ${user.isVerified ? 'Yes' : 'No'}`);
      console.log('');
    });
    console.log('═══════════════════════════════════════════════════');
    console.log(`\nTotal Users: ${users.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

checkDatabase();
