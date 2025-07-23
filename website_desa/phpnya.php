<?php

    $ch_url_file = 'https://desa.munabarat.go.id';
    $ch_url_host = 'http://0.0.0.0:5011';
    $kab = 'Muna Barat';
    $SSR = '';
    
    
     $datax = array(
            'url' => $_SERVER['SERVER_NAME']
        );
    
        $payloadx = json_encode($datax);
    
        $ch_url_hostx = 'http://0.0.0.0:5011';
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
        // echo $managex[0]->desa;
        
        
        
        
        
    function get_current_full_url() {
        // Tentukan protokol (http atau https)
        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
    
        // Dapatkan nama host (contoh: www.domainmu.com atau localhost:8080)
        $host = $_SERVER['HTTP_HOST'];
    
        // Dapatkan URI permintaan (path dan query string)
        // Contoh: /folder/halaman.php?id=123
        $uri = $_SERVER['REQUEST_URI'];
    
        // Gabungkan semua bagian untuk membentuk URL lengkap
        return $protocol . "://" . $host . $uri;
    }
    
    // Panggil fungsi dan tampilkan hasilnya
    $current_url = get_current_full_url();
    // echo "URL Lengkap Saat Ini: " . $current_url;
    // echo "<br>"; // Garis pemisah
    
    
    // Cara 2: Mengekstrak dari string URL menggunakan parse_url dan parse_str
    // Cara ini berguna jika URL tersebut berasal dari variabel string, bukan URL halaman yang sedang diakses.
    
    // Dapatkan bagian query string dari URL
    $query_string = parse_url($current_url, PHP_URL_QUERY);
    
    if ($query_string) {
        // Parse query string menjadi array asosiatif
        parse_str($query_string, $params);
    
        // Periksa apakah 'id' ada dalam array parameter
        
         // ================================ KEGIATAN ================================ 
        if (isset($params['id'])) {
            // $id_from_parsed_url = $params['id'];
            // echo "ID dari parse_url & parse_str: " . $id_from_parsed_url . "<br>";

            $id = htmlspecialchars($params['id']);
        
            $data = array(
                'id' => $id
            );
        
            $payload = json_encode($data);
        
            $ch = curl_init( $ch_url_host.'/api/v1/cnt_kegiatanTerbaru/getOne');
            
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLINFO_HEADER_OUT, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json',
                'Content-Length: ' . strlen($payload))
            );
            $result = curl_exec($ch);
            
            // Close cURL session handle
            curl_close($ch);
            $manage = json_decode($result);
            // echo $id;
            // echo $result;
            
            $SSR = '
                <meta property="fb:app_id" content="1879416282388598" />
                <meta property="og:url" content="https://'.$_SERVER['SERVER_NAME'].'/detilKegiatan?id='.$id.'" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content="'.$manage->judul.'" />
                <meta property="og:description" content="'.$manage->judul.'" />
                <meta property="og:image" content="'.$ch_url_file .'/uploads/'.$manage->file.'" />
            ';
        } 
        // ================================ KEGIATAN ================================ 
         
        // ================================ KEGIATAN PERPUSTAKAAN ================================
        
        if (isset($params['KegiatanperpusId'])) {

            $id = htmlspecialchars($params['KegiatanperpusId']);
        
            $data = array(
                'id' => $id
            );
        
            $payload = json_encode($data);
        
            $ch = curl_init( $ch_url_host.'/api/v1/cnt_desa_perpustakaanDigitalKeg/getOne');
            
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLINFO_HEADER_OUT, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json',
                'Content-Length: ' . strlen($payload))
            );
            $result = curl_exec($ch);
            
            // Close cURL session handle
            curl_close($ch);
            $manage = json_decode($result);

            $SSR = '
                <meta property="fb:app_id" content="1879416282388598" />
                <meta property="og:url" content="https://'.$_SERVER['SERVER_NAME'].'/kegiatanPerpusDetile?KegiatanperpusId='.$id.'" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content="'.$manage->judul.'" />
                <meta property="og:description" content="'.$manage->judul.'" />
                <meta property="og:image" content="'.$ch_url_file .'/uploads/'.$manage->file.'" />
            ';
        } 
        
        // ================================ KEGIATAN PERPUSTAKAAN ================================ 
        
        
        // ================================ KATALOG PERPUSTAKAAN ================================
        
        if (isset($params['katalogId'])) {

            $id = htmlspecialchars($params['katalogId']);
            $data = array(
                'id' => $id
            );
        
            $payload = json_encode($data);
            $ch = curl_init( $ch_url_host.'/api/v1/cnt_desa_perpustakaanDigital/ViewOne');
            
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLINFO_HEADER_OUT, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json',
                'Content-Length: ' . strlen($payload))
            );
            $result = curl_exec($ch);
            
            // Close cURL session handle
            curl_close($ch);
            $manage = json_decode($result);

            $SSR = '
                <meta property="fb:app_id" content="1879416282388598" />
                <meta property="og:url" content="https://'.$_SERVER['SERVER_NAME'].'/katalogPerpusDetile?katalogId='.$id.'" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content="'.$manage->judul.'" />
                <meta property="og:description" content="'.$manage->penulis.'" />
                <meta property="og:image" content="'.$ch_url_file .'/uploads/'.$manage->file.'" />
            ';
        } 
        
        // ================================ KATALOG PERPUSTAKAAN ================================ 
        
        
        
        else {
            $SSR = '
                <meta property="fb:app_id" content="1879416282388598" />
                <meta property="og:url" content="'.$current_url.'" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content="Website Resmi Desa '.$managex[0]->desa.'" />
                <meta property="og:description" content="Pemerintah Kab. '.$kab.'"/>
                <meta property="og:image" content="https://'.$_SERVER['SERVER_NAME'].'/img/logox.png" />
            ';
        }
    } 
    
    else {
        $SSR = '
                <meta property="fb:app_id" content="1879416282388598" />
                <meta property="og:url" content="'.$current_url.'" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content="Website Resmi Desa '.$managex[0]->desa.'" />
                <meta property="og:description" content="Pemerintah Kab. '.$kab.'"/>
                <meta property="og:image" content="https://'.$_SERVER['SERVER_NAME'].'/img/logox.png" />
            ';
    }

?>

<!DOCTYPE html>
<html lang=en>

<head>
    <meta charset=utf-8>
    <meta http-equiv=X-UA-Compatible content="IE=edge">
    <meta name=viewport content="width=device-width,initial-scale=1">
    
    <?php
    
    echo($SSR);
    ?>
    
    
    <!--[if IE]><link rel="icon" type=“image/x-icon” href="./favicon.ico"><![endif]-->
    <link rel=stylesheet type=text/css href=css/main.css>
    <link rel=stylesheet type=text/css href=css/color.css>
    <link rel=stylesheet type=text/css href=css/fonts.css>
    <link rel=stylesheet type=text/css href=css/input.css>
    <link rel=stylesheet type=text/css href=css/Froala.css>
    <link rel=stylesheet href=https://unpkg.com/vue-agile/dist/VueAgile.css>
    <link href=https://cdn.jsdelivr.net/npm/froala-editor@3.1.0/css/froala_editor.pkgd.min.css rel=stylesheet
        type=text/css>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap" rel=stylesheet>
    <link href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap" rel=stylesheet>
    <script src=https://code.highcharts.com/highcharts.js></script>
    <script src=https://code.highcharts.com/highcharts-3d.js></script>
    <script src=https://code.highcharts.com/modules/cylinder.js></script>
    <script src=https://code.highcharts.com/modules/exporting.js></script>
    <script src=https://code.highcharts.com/modules/export-data.js></script>
    <script src=https://code.highcharts.com/modules/accessibility.js></script>
    <script src=//cdn.jsdelivr.net/npm/sweetalert2@11></script>
    <script src=https://cdn.jsdelivr.net/lodash/4.13.1/lodash.js></script>
    <title>
        <?php 
          echo "Desa ".$managex[0]->desa
        ?>
    </title>
    <link href=css/chunk-167f9b36.0313df3f.css rel=prefetch>
    <link href=css/chunk-30fbaf12.6ca6f7c2.css rel=prefetch>
    <link href=css/chunk-3515dae0.0313df3f.css rel=prefetch>
    <link href=css/chunk-39779ee0.6ca6f7c2.css rel=prefetch>
    <link href=css/chunk-3bf81df4.0313df3f.css rel=prefetch>
    <link href=css/chunk-3d5898f1.0313df3f.css rel=prefetch>
    <link href=css/chunk-41b31eea.6ca6f7c2.css rel=prefetch>
    <link href=css/chunk-4e0fcefd.6ca6f7c2.css rel=prefetch>
    <link href=css/chunk-4e2e288a.6ca6f7c2.css rel=prefetch>
    <link href=css/chunk-4f3e4588.6ca6f7c2.css rel=prefetch>
    <link href=css/chunk-5b8d9c97.6ca6f7c2.css rel=prefetch>
    <link href=css/chunk-6034b514.0313df3f.css rel=prefetch>
    <link href=css/chunk-c7f2519a.6ca6f7c2.css rel=prefetch>
    <link href=css/chunk-dab8c934.6ca6f7c2.css rel=prefetch>
    <link href=css/chunk-e24d3f08.0313df3f.css rel=prefetch>
    <link href=js/chunk-167f9b36.029aca5d.js rel=prefetch>
    <link href=js/chunk-2d0b1be2.2cf8b40e.js rel=prefetch>
    <link href=js/chunk-2d0b6b06.20bf88da.js rel=prefetch>
    <link href=js/chunk-2d0b95ca.1fb5bc4e.js rel=prefetch>
    <link href=js/chunk-2d0ba4ae.65199cae.js rel=prefetch>
    <link href=js/chunk-2d0bd824.bb4f043e.js rel=prefetch>
    <link href=js/chunk-2d0be09b.591f1782.js rel=prefetch>
    <link href=js/chunk-2d0c0a59.ab1455a2.js rel=prefetch>
    <link href=js/chunk-2d0cb6b7.2e96f0bf.js rel=prefetch>
    <link href=js/chunk-2d0cb741.10f325f9.js rel=prefetch>
    <link href=js/chunk-2d0d092f.1802857b.js rel=prefetch>
    <link href=js/chunk-2d0d6738.0f0d3685.js rel=prefetch>
    <link href=js/chunk-2d0d6cf5.1ac2050f.js rel=prefetch>
    <link href=js/chunk-2d0db485.ed01e367.js rel=prefetch>
    <link href=js/chunk-2d0de5ae.0847a6ef.js rel=prefetch>
    <link href=js/chunk-2d0e5052.0068a40b.js rel=prefetch>
    <link href=js/chunk-2d207f62.788139b6.js rel=prefetch>
    <link href=js/chunk-2d20edc6.5fd674ee.js rel=prefetch>
    <link href=js/chunk-2d21ad5a.1c74b97e.js rel=prefetch>
    <link href=js/chunk-2d21b27c.43985d32.js rel=prefetch>
    <link href=js/chunk-2d21f325.aae51626.js rel=prefetch>
    <link href=js/chunk-2d225996.f98c0fcd.js rel=prefetch>
    <link href=js/chunk-2d230663.408b3026.js rel=prefetch>
    <link href=js/chunk-2d2375ad.a411f449.js rel=prefetch>
    <link href=js/chunk-30fbaf12.d0ec55bc.js rel=prefetch>
    <link href=js/chunk-3515dae0.d900ab65.js rel=prefetch>
    <link href=js/chunk-39779ee0.9acf048a.js rel=prefetch>
    <link href=js/chunk-3bf81df4.9a708e8f.js rel=prefetch>
    <link href=js/chunk-3d5898f1.379ed72f.js rel=prefetch>
    <link href=js/chunk-41b31eea.4e17d5d6.js rel=prefetch>
    <link href=js/chunk-45b24f80.549b4924.js rel=prefetch>
    <link href=js/chunk-4e0fcefd.86bd72b1.js rel=prefetch>
    <link href=js/chunk-4e2e288a.be58eedc.js rel=prefetch>
    <link href=js/chunk-4f3e4588.5604e7d1.js rel=prefetch>
    <link href=js/chunk-5b8d9c97.a803a209.js rel=prefetch>
    <link href=js/chunk-6034b514.ad4efe98.js rel=prefetch>
    <link href=js/chunk-83880c76.682583be.js rel=prefetch>
    <link href=js/chunk-83897146.ce6e48c3.js rel=prefetch>
    <link href=js/chunk-838b631c.a725a7df.js rel=prefetch>
    <link href=js/chunk-838bd760.e30b4ca6.js rel=prefetch>
    <link href=js/chunk-83b27e70.bb2924f7.js rel=prefetch>
    <link href=js/chunk-83b2ec06.b1e82555.js rel=prefetch>
    <link href=js/chunk-83b44d1a.73d23ac4.js rel=prefetch>
    <link href=js/chunk-83b4a038.4e808c86.js rel=prefetch>
    <link href=js/chunk-83b53af0.e542925a.js rel=prefetch>
    <link href=js/chunk-83b590f8.c992a30a.js rel=prefetch>
    <link href=js/chunk-83b5fda8.8240aabc.js rel=prefetch>
    <link href=js/chunk-83b60f74.522874cc.js rel=prefetch>
    <link href=js/chunk-83b67588.c2e34ba3.js rel=prefetch>
    <link href=js/chunk-83b675ee.db970373.js rel=prefetch>
    <link href=js/chunk-83b6d9f0.088263bd.js rel=prefetch>
    <link href=js/chunk-83b6da54.99cb9432.js rel=prefetch>
    <link href=js/chunk-83b859b4.e7ff4407.js rel=prefetch>
    <link href=js/chunk-83b86c50.991f19f2.js rel=prefetch>
    <link href=js/chunk-83b86cf0.b0980217.js rel=prefetch>
    <link href=js/chunk-83b8b0de.1bb9cc70.js rel=prefetch>
    <link href=js/chunk-83b8f284.19c680f8.js rel=prefetch>
    <link href=js/chunk-83ba976e.06b6b5cc.js rel=prefetch>
    <link href=js/chunk-83babdea.7055dd33.js rel=prefetch>
    <link href=js/chunk-c7f2519a.35359b61.js rel=prefetch>
    <link href=js/chunk-dab8c934.649523b4.js rel=prefetch>
    <link href=js/chunk-e24d3f08.6ee8c0c9.js rel=prefetch>
    <link href=css/app.bdc0b336.css rel=preload as=style>
    <link href=css/chunk-vendors.672144c4.css rel=preload as=style>
    <link href=js/app.33ed85ec.js rel=preload as=script>
    <link href=js/chunk-vendors.410e832e.js rel=preload as=script>
    <link href=css/chunk-vendors.672144c4.css rel=stylesheet>
    <link href=css/app.bdc0b336.css rel=stylesheet>
    <link rel=icon type=image/png sizes=32x32 href=img/icons/favicon-32x32.png>
    <link rel=icon type=image/png sizes=16x16 href=img/icons/favicon-16x16.png>
    <link rel=manifest href=manifest.json>
    <meta name=theme-color content=#4DBA87>
    <meta name=apple-mobile-web-app-capable content=no>
    <meta name=apple-mobile-web-app-status-bar-style content=default>
    <meta name=apple-mobile-web-app-title content=website>
    <link rel=apple-touch-icon href=img/icons/apple-touch-icon-152x152.png>
    <link rel=mask-icon href=img/icons/safari-pinned-tab.svg color=#4DBA87>
    <meta name=msapplication-TileImage content=img/icons/msapplication-icon-144x144.png>
    <meta name=msapplication-TileColor content=#000000>
</head>

<body class=""><noscript><strong>We're sorry but website doesn't work properly without JavaScript enabled. Please enable
            it to continue.</strong></noscript>
    <div id=app></div>
    <script src=js/chunk-vendors.410e832e.js></script>
    <script src=js/app.33ed85ec.js></script>
</body>

</html>