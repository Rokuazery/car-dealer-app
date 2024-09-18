<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id(); // Primary Key
            $table->string('name');
            $table->enum('brand', ['Audi', 'Toyota', 'Honda', 'Mitsubishi', 'Ferrari', 'Volkswagen', 'Hyundai', 'Lamborghini', 'Aston Martin', 'Omoda', 'Maserati']);
            $table->year('production_year');
            $table->decimal('price', 10, 2); // Decimal for price
            $table->integer('stock'); // Integer for stock count
            $table->string('image_url'); // String for image file path
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};