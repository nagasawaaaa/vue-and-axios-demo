<?php
  if(isset($_GET["url"]) && preg_match("/^https?:/",$_GET["url"])){
    $data = file_get_contents($_GET["url"]);
    $data = mb_convert_encoding($data, 'UTF8', 'ASCII,JIS,UTF-8,EUC-JP,SJIS-WIN');
    echo $data;
  }else{
    echo "error";
  }
