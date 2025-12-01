import mongoose from 'mongoose';
import User from './models/User.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const seedUsers = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Check if users already exist
    const existingUsers = await User.countDocuments();
    if (existingUsers > 0) {
      console.log(`\n⚠️  Database already has ${existingUsers} users.`);
      console.log('Do you want to clear existing users and reseed? (This will delete all users!)');
      console.log('To proceed, run: node seed.js --force');
      
      if (!process.argv.includes('--force')) {
        process.exit(0);
      }
      
      console.log('\n🗑️  Clearing existing users...');
      await User.deleteMany({});
      console.log('✓ Existing users cleared');
    }

    console.log('\n📝 Creating test users...');

    const users = [
      {
        studentId: '01-111-191',
        name: 'Test Student',
        email: 'student@bu.edu.pk',
        passwordHash: await bcrypt.hash('Student123!', 10),
        role: 'student',
        isVerified: true
      },
      {
        name: 'Dr. John Supervisor',
        email: 'supervisor@bu.edu.pk',
        passwordHash: await bcrypt.hash('Super123!', 10),
        role: 'supervisor',
        supervisorQuota: 4,
        currentSupervisionCount: 0,
        researchDomains: ['Software Engineering', 'Machine Learning'],
        isVerified: true
      },
      {
        name: 'Dr. Sarah Coordinator',
        email: 'coordinator@bu.edu.pk',
        passwordHash: await bcrypt.hash('Coord123!', 10),
        role: 'coordinator',
        isVerified: true
      },
      {
        name: 'Dr. Ahmed HOD',
        email: 'hod@bu.edu.pk',
        passwordHash: await bcrypt.hash('Hod123!', 10),
        role: 'hod',
        isVerified: true
      },
      {
        name: 'Dr. External Evaluator',
        email: 'evaluator@bu.edu.pk',
        passwordHash: await bcrypt.hash('Eval123!', 10),
        role: 'evaluator',
        expertise: ['Software Engineering', 'Data Science'],
        isExternal: true,
        isVerified: true
      }
    ];

    await User.insertMany(users);
    console.log('✓ Sample users created successfully');
    
    console.log('\n═══════════════════════════════════════════════════');
    console.log('🎉 Database seeded successfully!');
    console.log('═══════════════════════════════════════════════════');
    console.log('\n📧 Login Credentials:\n');
    console.log('👤 Student:');
    console.log('   Email: student@bu.edu.pk');
    console.log('   Password: Student123!\n');
    console.log('👨‍🏫 Supervisor:');
    console.log('   Email: supervisor@bu.edu.pk');
    console.log('   Password: Super123!\n');
    console.log('👨‍💼 Coordinator:');
    console.log('   Email: coordinator@bu.edu.pk');
    console.log('   Password: Coord123!\n');
    console.log('👔 HOD:');
    console.log('   Email: hod@bu.edu.pk');
    console.log('   Password: Hod123!\n');
    console.log('🎓 Evaluator:');
    console.log('   Email: evaluator@bu.edu.pk');
    console.log('   Password: Eval123!\n');
    console.log('═══════════════════════════════════════════════════');
    console.log('\n✅ You can now start the server with: npm start');
    console.log('✅ Then login at: http://localhost:5173\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedUsers();
