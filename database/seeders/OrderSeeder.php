<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\Car;
use Faker\Factory as Faker;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        $statuses = ['Pending', 'Confirmed', 'Canceled'];

        foreach (range(1, 30) as $index) {
            Order::create([
                'car_id' => Car::inRandomOrder()->first()->id,
                'customer_name' => $faker->name,
                'ordered_at' => $faker->date(),
                'status' => $faker->randomElement($statuses),
            ]);
        }
    }
}
