<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $orders = Order::where('user_id', $user->id)->with('car')->get();
        return Inertia::render('Orders', [
            'orders' => $orders,
            'user' => $user
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
    $user = Auth::user();
    $car = Car::find($request->car_id);

    if (!$car || $car->stock < 1) {
        return response()->json(['message' => 'Car not available or out of stock'], 400);
    }

    // Decrease car stock
    $car->stock -= 1;
    $car->save();

    // Create a new order
    $order = new Order();
    $order->user_id = $user->id;
    $order->car_id = $car->id;
    $order->quantity = 1; // Adjust quantity as necessary
    $order->save();

    return response()->json(['message' => 'Order placed successfully', 'car' => $car]);
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
