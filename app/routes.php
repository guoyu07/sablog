<?php

use Desarrolla2\RSSClient\RSSClient;
date_default_timezone_set('America/Chicago');

// http://planitpurple.northwestern.edu/feed/xml/447

//Route::get('posts', function()
//{
//    $url = 'http://studentaffairsnu.wordpress.com/feed/';
//    $client = new RSSClient();
//    $client->addFeeds([$url], 'posts');
//    $items = $client->fetch('posts');
//
//    $itemsArray = [];
//    foreach($items as $item)
//    {
//        $title = $item->getTitle();
//        $link  = $item->getLink();
//
//        $date = $item->getPubDate();
//        $date->setTimezone(new DateTimeZone('America/Chicago'));
//        $dateString = $date->format('m.d.y');
//
//        $author = $item->getAuthor();
//
//
//        $description = preg_replace('/<img.*>/', '', $item->getDescription() );
//
//        array_push($itemsArray, [
//            'title'       => $title,
//            'link'        => $link,
//            'description' => $description,
//            'pubDate'     => $dateString,
//            'author'      => $author
//        ]);
//    }
//
//    $firstTwoItems = [$itemsArray[0], $itemsArray[1]];
//	return Response::json($firstTwoItems);
//});

Route::get('posts', function() {
    $url = 'http://studentaffairsnu.wordpress.com/feed/';
    $rss = simplexml_load_file($url);

    $itemsArray = [];

    foreach($rss->channel->item as $item)
    {
        $pubDate = (string) $item->pubDate;
        $date = new DateTime($pubDate);
        $date->setTimezone(new DateTimeZone('America/Chicago'));
        $dateString = $date->format('m.d.y');

        $avatar = (string) $item->children('http://search.yahoo.com/mrss/')->attributes()->url;

        $description = (string) $item->description;
        $description = preg_replace('/<img.*>/', '', $description );


        array_push($itemsArray, [
            'pubDate' => $dateString,
            'link'    => (string) $item->link,
            'description' => (string) $description,
            'title'   => (string) $item->title,
            'creator' => (string) $item->children('http://purl.org/dc/elements/1.1/')->creator,
            'avatar'  => $avatar
        ]);


    }

    // quick fix to add other's avatars:
    $jamesAvatar = 'https://go.dosa.northwestern.edu/shared/redesign/public/img/avatars/james.png';
    $laraAvatar  = 'https://go.dosa.northwestern.edu/shared/redesign/public/img/avatars/lara.jpg';
    foreach ($itemsArray as &$item)
    {
        if ($item['creator'] === 'Chris Walker')
        {
            if ($item['title'] == 'Views from the Cube: Singapore Lyric Opera & Flyinginkpot.com Intern Lara Saldanha')
            {
                $item['avatar'] = $laraAvatar;
            }
            if ($item['title'] == 'Welcome to the Student Blog')
            {
                $item['avatar'] = $jamesAvatar;
            }
        }
    }

    $firstTwoItems = [$itemsArray[0], $itemsArray[1]];
    return Response::json($firstTwoItems);
});