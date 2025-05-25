<h1>React-Laravel-Inertia-Shadcdn</h1>

<h2>Prerequisites</h2>
<p>Ensure you have the following installed on your system:</p>
<ul>
  <li><a href="https://getcomposer.org/" target="_blank">Composer</a></li>
  <li><a href="https://www.php.net/" target="_blank">PHP</a></li>
  <li><a href="https://nodejs.org/" target="_blank">Node.js & npm</a></li>
</ul>

<h2>Installation Steps</h2>

<ol>
  <li><strong>Install PHP dependencies:</strong>
    <pre><code>composer install</code></pre>
  </li>
  
  <li><strong>Copy the environment configuration file:</strong>
    <pre><code>cp .env.example .env</code></pre>
  </li>
  
  <li><strong>Generate the application key:</strong>
    <pre><code>php artisan key:generate</code></pre>
  </li>
  
  <li><strong>Install Node.js dependencies:</strong>
    <pre><code>npm install</code></pre>
  </li>
  
  <li><strong>Run database migrations:</strong>
    <pre><code>php artisan migrate</code></pre>
  </li>
  
  <li><strong>Build frontend assets:</strong>
    <pre><code>npm run dev</code></pre>
  </li>
  
  <li><strong>Start the development server:</strong>
    <pre><code>php artisan serve</code></pre>
  </li>
</ol>

<p>Your application should now be running. Open your browser and navigate to <code>http://127.0.0.1:8000/</code> to access it.</p>

cd /home/doublebi/public_html/laravel/
