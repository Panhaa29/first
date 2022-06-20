
<?php
    $img = $_FILES['txt-file'];
    $name = $img['name'];
    $ext = pathinfo($name,PATHINFO_EXTENSION);
    $new_name = time();
    $tmp_name = $img['tmp_name'];
    $new_name = mt_rand(100000, 999999).$new_name.'.'.$ext;
    //echo tmp_name
    move_uploaded_file($tmp_name, '../img/'.$new_name);
    $msg['img']= $new_name;

    echo json_encode($msg);
?>