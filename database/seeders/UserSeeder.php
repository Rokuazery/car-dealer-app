<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 30) as $index) {
            User::create([
                'name' => $faker->name,
                'username' => $faker->unique()->userName,
                'password' => Hash::make('password'), // Default password
                'role' => $faker->randomElement(['admin', 'staff']),
            ]);
        }
    }
}
