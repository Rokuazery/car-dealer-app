<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
         Schema::create('orders', function (Blueprint $table) {
            $table->id(); // Primary Key
            $table->foreignId('car_id')->constrained('cars')->onDelete('cascade'); // Foreign Key referencing cars table
            $table->string('customer_name');
            $table->date('ordered_at');
            $table->enum('status', ['Pending', 'Confirmed', 'Canceled']); // Order status options
            $table->timestamps(); // Adds created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
