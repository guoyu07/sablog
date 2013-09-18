<?php

use Desarrolla2\RSSClient\RSSClient;

// http://planitpurple.northwestern.edu/feed/xml/447

Route::get('posts', function()
{
    $url = 'http://studentaffairsnu.wordpress.com/feed/';
    $client = new RSSClient();
    $client->addFeeds([$url], 'posts');
    $items = $client->fetch('posts');

    $itemsArray = [];
    foreach($items as $item)
    {
        $title = $item->getTitle();
        $link  = $item->getLink();
        $description = preg_replace('/<img.*>/', '', $item->getDescription() );

        array_push($itemsArray, [
            'title'        => $title,
            'link'        => $link,
            'description' => $description
        ]);
    }

    $firstTwoItems = [$itemsArray[0], $itemsArray[1]];
	return Response::json($firstTwoItems);
});