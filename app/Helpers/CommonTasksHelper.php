<?php

namespace App\Helpers;

use Illuminate\Support\Arr;

class CommonTasksHelper{

    public static function getTranslations(string $model): array{

        $locale = app()->getLocale(); // get current locale
        $path = resource_path("lang/{$locale}/{$model}.json");
        //get the translations from the json file.
        $translations = Arr::dot(json_decode(file_get_contents($path), true));

        return $translations;
    }
}



?>