<?php

    //echo $_SERVER['SERVER_NAME'];
    $ch_url_file = 'https://serverdesa.konaweselatankab.go.id';
    
     $datax = array(
            'url' => $_SERVER['SERVER_NAME']
        );
    
        $payloadx = json_encode($datax);
    
        $ch_url_hostx = 'http://localhost:5011';
        $chx = curl_init( $ch_url_hostx.'/api/v1/cnt_des_kel/getDesaByURL');
        
        curl_setopt($chx, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($chx, CURLINFO_HEADER_OUT, true);
        curl_setopt($chx, CURLOPT_POST, true);
        curl_setopt($chx, CURLOPT_POSTFIELDS, $payloadx);
    
        curl_setopt($chx, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Content-Length: ' . strlen($payloadx))
        );
   
    
        $objectDesa = curl_exec($chx);

        
        // Close cURL session handle
        curl_close($chx);
    
        $managex = json_decode($objectDesa );
        
          // echo $objectDesa ;
          //  echo $id;
           // echo $managex[0]->desa;

    
    if(isset($_GET['id'])) {
        $id = htmlspecialchars($_GET["id"]);
        
        $data = array(
        'id' => $id
        );
    
        $payload = json_encode($data);
    
        $ch_url_host = 'http://localhost:5011';
        $ch = curl_init( $ch_url_host.'/api/v1/cnt_kegiatanTerbaru/getOne');
        
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLINFO_HEADER_OUT, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Content-Length: ' . strlen($payload))
        );
    
        // $ch = curl_init();
    
    
        $result = curl_exec($ch);
        
        // Close cURL session handle
        curl_close($ch);
    
        $manage = json_decode($result);
        
        
        //  echo $id;
        // echo $result;
        
    }
    
    // ================================ KEGIATAN PERPUSTAKAAN ================================ 
    
    elseif (isset($_GET['KegiatanperpusId'])) {
        
        $id = htmlspecialchars($_GET["KegiatanperpusId"]);
        
        $data = array(
            'id' => $id
        );
    
        $payload = json_encode($data);
    
        $ch_url_host = 'http://localhost:5011';
        $ch = curl_init( $ch_url_host.'/api/v1/cnt_desa_perpustakaanDigitalKeg/getOne');
        
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLINFO_HEADER_OUT, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Content-Length: ' . strlen($payload))
        );
    
        // $ch = curl_init();
    
    
        $result = curl_exec($ch);
        
        // Close cURL session handle
        curl_close($ch);
    
        $manage = json_decode($result);
        
        
        //  echo $id;
        // echo $result;
        
    }
    
    // ================================ KEGIATAN PERPUSTAKAAN ================================ 
    
    // ================================ DETILE KATALOG ================================ 
    
    elseif (isset($_GET['katalogId'])) {
        
        $id = htmlspecialchars($_GET["katalogId"]);
        
        $data = array(
            'id' => $id
        );
    
        $payload = json_encode($data);
    
        $ch_url_host = 'http://localhost:5011';
        $ch = curl_init( $ch_url_host.'/api/v1/cnt_desa_perpustakaanDigital/ViewOne');
        
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLINFO_HEADER_OUT, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Content-Length: ' . strlen($payload))
        );
    
        // $ch = curl_init();
    
    
        $result = curl_exec($ch);
        
        // Close cURL session handle
        curl_close($ch);
    
        $manage = json_decode($result);
        
        
        //  echo $id;
        // echo $result;
        
    }
    
    // ================================ DETILE KATALOG ================================ 
    
    

?>


<!DOCTYPE html>
<html lang=en>

<head>
    <meta charset=utf-8>
    <meta http-equiv=X-UA-Compatible content="IE=edge">
    <meta name=viewport content="width=device-width,initial-scale=1">





    <?php
        if(isset($_GET['id'])){
            echo '
                <meta property="fb:app_id" content="1879416282388598" />
                <meta property="og:url" content="https://'.$_SERVER['SERVER_NAME'].'/detilKegiatan?id='.$id.'" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content="'.$manage->judul.'" />
                <meta property="og:description" content="'.$manage->judul.'" />
                <meta property="og:image" content="'.$ch_url_file .'/uploads/'.$manage->file.'" />
            ';
        }

    
        elseif (isset($_GET['KegiatanperpusId'])){
            echo '
                <meta property="fb:app_id" content="1879416282388598" />
                <meta property="og:url" content="https://'.$_SERVER['SERVER_NAME'].'/KegiatanperpusId?KegiatanperpusId='.$id.'" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content="'.$manage->judul.'" />
                <meta property="og:description" content="'.$manage->judul.'" />
                <meta property="og:image" content="'.$ch_url_file .'/uploads/'.$manage->file.'" />
            ';
        }
        
        elseif (isset($_GET['katalogId'])){
            echo '
                <meta property="fb:app_id" content="1879416282388598" />
                <meta property="og:url" content="https://'.$_SERVER['SERVER_NAME'].'/katalogPerpusDetile?katalogId='.$id.'" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content="'.$manage->judul.'" />
                <meta property="og:description" content="'.$manage->penulis.'" />
                <meta property="og:image" content="'.$ch_url_file .'/uploads/'.$manage->file.'" />
            ';
        }
        
        
        else {
            $url = $protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
            // echo 'https://'.$url;
            
            echo '
                <meta property="fb:app_id" content="1879416282388598" />
                <meta property="og:url" content="https://'.$url.'" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content="WEBSITE RESMI DES/KEL '.$managex[0]->desa.'" />
                <meta property="og:description" content="Pemerintah Kab. Konawe Selatan" />
                <meta property="og:image" content="https://'.$_SERVER['SERVER_NAME'].'/img/logos.png" />
            ';
            
            
        }
        
    ?>





    <!--[if IE]><link rel="icon" type=“image/x-icon” href="./favicon.ico"><![endif]-->
    <link rel=stylesheet type=text/css href=css/main.css> <link rel=stylesheet type=text/css href=css/color.css> <link
        rel=stylesheet type=text/css href=css/fonts.css> <link rel=stylesheet type=text/css href=css/input.css> <link
        href="https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap" rel=stylesheet>
    <link href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap" rel=stylesheet>
    <link href=https://cdn.jsdelivr.net/npm/froala-editor@3.1.0/css/froala_editor.pkgd.min.css rel=stylesheet
        type=text/css> <script src=https://code.highcharts.com/highcharts.js> </script> <script
        src=https://code.highcharts.com/highcharts-3d.js> </script> <script
        src=https://code.highcharts.com/modules/cylinder.js> </script> <script
        src=https://code.highcharts.com/modules/exporting.js> </script> <script
        src=https://code.highcharts.com/modules/export-data.js> </script> <script
        src=https://code.highcharts.com/modules/accessibility.js> </script> <link
        href=https://cdn.jsdelivr.net/npm/froala-editor@3.1.0/css/froala_editor.pkgd.min.css rel=stylesheet
        type=text/css> <script src=https://cdn.jsdelivr.net/lodash/4.13.1/lodash.js> </script> 
        <title>
		
		
		
		
		
		
        <?php 
          echo $managex[0]->desa
          
        ?>
		
		
		
		
		
		
		
		
		
		
		
        </title>
    <link href=css/chunk-1699f7f7.0313df3f.css rel=prefetch>
    <link href=css/chunk-301566e2.0313df3f.css rel=prefetch>
    <link href=css/chunk-75cd9f28.0313df3f.css rel=prefetch>
    <link href=css/chunk-788e9522.0313df3f.css rel=prefetch>
    <link href=css/chunk-86531b4a.0313df3f.css rel=prefetch>
    <link href=css/chunk-c37f9a9e.0313df3f.css rel=prefetch>
    <link href=js/chunk-1699f7f7.a818de7c.js rel=prefetch>
    <link href=js/chunk-2d0b1be2.f52c1cd5.js rel=prefetch>
    <link href=js/chunk-2d0b6b06.3f5d5337.js rel=prefetch>
    <link href=js/chunk-2d0b95ca.632b74bc.js rel=prefetch>
    <link href=js/chunk-2d0ba4ae.158641ff.js rel=prefetch>
    <link href=js/chunk-2d0bd824.7c5737bc.js rel=prefetch>
    <link href=js/chunk-2d0be09b.3c866c60.js rel=prefetch>
    <link href=js/chunk-2d0c0a59.cf24e268.js rel=prefetch>
    <link href=js/chunk-2d0cb741.7fc0265f.js rel=prefetch>
    <link href=js/chunk-2d0d6738.bf2a0195.js rel=prefetch>
    <link href=js/chunk-2d0d6cf5.ade7760f.js rel=prefetch>
    <link href=js/chunk-2d0db485.1926946f.js rel=prefetch>
    <link href=js/chunk-2d0de5ae.e197acd3.js rel=prefetch>
    <link href=js/chunk-2d0e5052.c5146d41.js rel=prefetch>
    <link href=js/chunk-2d20edc6.23ac8515.js rel=prefetch>
    <link href=js/chunk-2d21ad5a.686023db.js rel=prefetch>
    <link href=js/chunk-2d225996.d6a8d90d.js rel=prefetch>
    <link href=js/chunk-2d230663.f986a2fb.js rel=prefetch>
    <link href=js/chunk-2d2375ad.5d0edee5.js rel=prefetch>
    <link href=js/chunk-301566e2.81aec440.js rel=prefetch>
    <link href=js/chunk-59b4d3e7.f71c45a4.js rel=prefetch>
    <link href=js/chunk-64c91239.c38a798e.js rel=prefetch>
    <link href=js/chunk-75cd9f28.63e4d4dd.js rel=prefetch>
    <link href=js/chunk-788e9522.6fdf9b52.js rel=prefetch>
    <link href=js/chunk-86531b4a.040e8347.js rel=prefetch>
    <link href=js/chunk-911b185a.5f5c22f3.js rel=prefetch>
    <link href=js/chunk-911c7d2a.10a4014a.js rel=prefetch>
    <link href=js/chunk-911ee344.84b282a4.js rel=prefetch>
    <link href=js/chunk-91458a54.387c6676.js rel=prefetch>
    <link href=js/chunk-914758fe.0fb6e648.js rel=prefetch>
    <link href=js/chunk-9147ac1c.8578d67f.js rel=prefetch>
    <link href=js/chunk-9149098c.3e45bad4.js rel=prefetch>
    <link href=js/chunk-91491b58.47d79205.js rel=prefetch>
    <link href=js/chunk-9149816c.5122143f.js rel=prefetch>
    <link href=js/chunk-9149e5d4.10e527cd.js rel=prefetch>
    <link href=js/chunk-914b6598.bfb35d35.js rel=prefetch>
    <link href=js/chunk-914b7834.8cbb3c99.js rel=prefetch>
    <link href=js/chunk-914b78d4.1de206cd.js rel=prefetch>
    <link href=js/chunk-914bbcc2.f3ee641e.js rel=prefetch>
    <link href=js/chunk-914dc9ce.690ca2a3.js rel=prefetch>
    <link href=js/chunk-bae4d452.fe97c5e8.js rel=prefetch>
    <link href=js/chunk-bb0c5d3c.08461ba2.js rel=prefetch>
    <link href=js/chunk-bb0eac26.2a216046.js rel=prefetch>
    <link href=js/chunk-bb0f022e.b71d7fa1.js rel=prefetch>
    <link href=js/chunk-bb0fe724.b3ce0eee.js rel=prefetch>
    <link href=js/chunk-bb104b8a.eb18d7ef.js rel=prefetch>
    <link href=js/chunk-bb1263ba.cfcf394f.js rel=prefetch>
    <link href=js/chunk-bb1408a4.82123b6d.js rel=prefetch>
    <link href=js/chunk-c37f9a9e.138fab84.js rel=prefetch>
    <link href=css/app.62552566.css rel=preload as=style>
    <link href=css/chunk-vendors.39395d66.css rel=preload as=style>
    <link href=js/app.da663cb8.js rel=preload as=script>
    <link href=js/chunk-vendors.0e612fdb.js rel=preload as=script>
    <link href=css/chunk-vendors.39395d66.css rel=stylesheet>
    <link href=css/app.62552566.css rel=stylesheet>
    <link rel=icon type=image/png sizes=32x32 href=img/icons/favicon-32x32.png> <link rel=icon type=image/png
        sizes=16x16 href=img/icons/favicon-16x16.png> <link rel=manifest href=manifest.json>
    <meta name=theme-color content=#4DBA87>
    <meta name=apple-mobile-web-app-capable content=no>
    <meta name=apple-mobile-web-app-status-bar-style content=default>
    <meta name=apple-mobile-web-app-title content=website>
    <link rel=apple-touch-icon href=img/icons/apple-touch-icon-152x152.png> <link rel=mask-icon
        href=img/icons/safari-pinned-tab.svg color=#4DBA87>
    <meta name=msapplication-TileImage content=img/icons/msapplication-icon-144x144.png> <meta
        name=msapplication-TileColor content=#000000>
</head>

<body class=""><noscript><strong>We're sorry but website doesn't work properly without JavaScript enabled. Please enable
            it to continue.</strong></noscript>
    <div id=app></div>
    <script src=js/chunk-vendors.0e612fdb.js> </script> <script src=js/app.da663cb8.js> </script> </body> </html>