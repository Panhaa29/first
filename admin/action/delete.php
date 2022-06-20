<?php
    $cn = new mysqli("localhost","root","","php_1");
    $id = $_POST['id'];
    $img = $_POST['img'];
    $res['status']=false;
    $sql = "DELETE FROM tbl_menu WHERE id = $id";
    if( $cn->query($sql) ){
        if($img != ''){
            unlink("../img/".$img);
        }
        
        $res['status']=true;
    }
    
    echo json_encode($res);
    
?>