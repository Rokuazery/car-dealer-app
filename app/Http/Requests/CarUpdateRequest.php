<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CarUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'brand' => ['required', 'in:Audi,Toyota,Honda,Mitsubishi,Ferrari,Volkswagen,Hyundai,Lamborghini,Aston Martin,Omoda,Maserati'],
            'production_year' => ['required', 'integer', 'digits:4', 'min:1886'],
            'price' => ['required', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
            'image_url' => ['nullable', 'string', 'max:255', 'url'],
        ];
    }
}
