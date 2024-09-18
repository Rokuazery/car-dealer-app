<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Car;
use Faker\Factory as Faker;

class CarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        $brands = ['Audi', 'Toyota', 'Honda', 'Mitsubishi', 'Ferrari', 'Volkswagen', 'Hyundai', 'Lamborghini', 'Aston Martin', 'Omoda', 'Maserati'];
        $images = [
            'https://www.autoshippers.co.uk/blog/wp-content/uploads/bugatti-centodieci-1024x576.jpg',
            'https://carwow-uk-wp-3.imgix.net/18015-MC20BluInfinito-scaled-e1707920217641.jpg',
            'https://medias.auto2000.co.id/sys-master-hybrismedia/h05/h86/8846786625566/4-black-+-super-white-ii_optimized.png',
            'https://stimg.cardekho.com/images/carexteriorimages/930x620/Honda/City/9710/1677914238296/front-left-side-47.jpg',
            'https://di-uploads-pod14.dealerinspire.com/hondaeastcincy/uploads/2022/07/2207-Honda-Civic-Si-Model-1.jpg',
        ];

        foreach (range(1, 30) as $index) {
            Car::create([
                'name' => $faker->word,
                'brand' => $faker->randomElement($brands),
                'production_year' => $faker->year,
                'price' => $faker->randomFloat(2, 10000, 100000),
                'stock' => $faker->numberBetween(1, 100),
                'image_url' => $faker->randomElement($images),
            ]);
        }
    }
}
