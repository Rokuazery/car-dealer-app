<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   public function index()
{
    $user = Auth::user(); // Get the currently authenticated user
    $cars = Car::all();
    $orders = Order::all();
    
    $isAdmin = $user->role === 'admin'; // Check if the user's role is 'admin'

    // Initialize status counts
    $statusCounts = [
        'Pending' => 0,
        'Confirmed' => 0,
        'Canceled' => 0,
    ];

    // Calculate statistics if the user is an admin
    if ($isAdmin) {
        $totalCars = $cars->count();

        // Calculate unsold cars by checking if they have no related orders
        $unsoldCars = Car::doesntHave('orders')->count();

        $totalOrders = $orders->count();

        // Sum the prices of confirmed orders by joining orders with cars
        $totalEarnings = Order::join('cars', 'orders.car_id', '=', 'cars.id')
            ->where('orders.status', 'Confirmed') // Only confirmed orders
            ->sum('cars.price');

        // Count the number of orders by their status
        $statusCounts = Order::selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status') // Get the counts as an associative array
            ->toArray();

        // Fill in missing statuses (if any)
        $statusCounts = array_merge([
            'Pending' => 0,
            'Confirmed' => 0,
            'Canceled' => 0,
        ], $statusCounts);
    } else {
        $totalCars = $unsoldCars = $totalOrders = $totalEarnings = 0;
    }

    return Inertia::render('Dashboard', [
        'cars' => $cars,
        'orders' => $orders,
        'isAdmin' => $isAdmin,
        'totalCars' => $totalCars,
        'unsoldCars' => $unsoldCars,
        'totalOrders' => $totalOrders,
        'totalEarnings' => $totalEarnings,
        'statusCounts' => $statusCounts, // Pass the status counts
    ]);
}



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
