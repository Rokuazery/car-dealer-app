<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'brand',
        'production_year',
        'price',
        'stock',
        'image_url',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'production_year' => 'integer',
        'price' => 'decimal:2',
    ];

    /**
     * Get the orders for the car.
     */
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
