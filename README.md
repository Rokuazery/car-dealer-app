<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- Simple, fast routing engine
- Powerful dependency injection container
- Multiple back-ends for session and cache storage
- Expressive, intuitive database ORM
- Database agnostic schema migrations
- Robust background job processing
- Real-time event broadcasting

## Setup Instructions

To set up the project locally, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Rokuazery/car-dealer-app
    cd car-dealer-app
    ```

2. **Install NPM dependencies**:

    ```bash
    npm install
    ```

3. **Install Composer dependencies**:

    ```bash
    composer install
    ```

4. **Set up your `.env` file**:

    Copy the example environment file and update your database credentials.

    ```bash
    cp .env.example .env
    ```

5. **Generate an application key**:

    ```bash
    php artisan key:generate
    ```

6. **Run database migrations**:

    ```bash
    php artisan migrate
    ```

7. **Seed the database (if applicable)**:

    ```bash
    php artisan db:seed
    ```

8. **Run the development server**:

    ```bash
    php artisan serve
    ```

9. **Compile assets (optional)**:

    To compile front-end assets like CSS and JavaScript, run:

    ```bash
    npm run dev
    ```

    For production:

    ```bash
    npm run prod
    ```

10. **Access the application**:

    Open your browser and go to `http://localhost:8000`.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
