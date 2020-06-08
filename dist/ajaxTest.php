<?php
    header("Content-Type:text/html;charset=utf8");
    $link = new PDO("mysql:host=localhost;dbname=owl_bookstore;charset=utf8","root","");
    $link->query("set names utf8");
?>
<?php
    $sql = "select*from owl_book";

    $result = $link->query($sql);
?>
<?php

    $data_Arr = array();

    while($rs = $result->fetch(PDO::FETCH_ASSOC)){
        $data = array(
            "id"=>$rs["ob_id"],
            "name"=>urlencode($rs["ob_name"]),
            "author"=>urlencode($rs["ob_author"]),
            "publishing"=>urlencode($rs["ob_publishing"]),
            "publication_day"=>$rs["ob_publication_day"],
            "price"=>$rs["ob_price"],
            "content"=>urlencode($rs["ob_content"]),
            "img"=>$rs["ob_img"],
            "ISBN"=>$rs["ISBN"]
        );
        array_push($data_Arr,$data);
    }
    $data_Arr_en = json_encode($data_Arr);
    $data_Arr_url = urldecode($data_Arr_en);
    echo $data_Arr_url;
?>