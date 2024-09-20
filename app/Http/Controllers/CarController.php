<?php

namespace App\Http\Controllers;

use App\Http\Requests\CarUpdateRequest;
use App\Models\Car;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $cars = Car::orderBy('created_at', 'desc')->get();
        return Inertia::render('Cars', ['cars' => $cars]);
    }
    
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CarUpdateRequest $request)
    {
        Car::create($request->validated());

        return response(null,201);
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
    public function update(CarUpdateRequest $request, string $id)
    {
        $car = Car::findOrFail($id);
        $car->update($request->validated());
        
        return response(null,200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $car = Car::findOrFail($id);

        $car->delete();

        return response(null,200);
    }
}
