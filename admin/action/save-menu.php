<?php
    $cn = new mysqli("localhost","root","","php_1");
    $cn->set_charset("utf8");

    $name = trim( $_POST["txt-name"]);
    $name = $cn-> real_escape_string($name);
    $des = $_POST["txt-des"];
    $des = $cn-> real_escape_string($des);
    $des = str_replace('\n','<br>',$des);
    $photo = $_POST["txt-photo"];
    $editId = $_POST["txt-edit-id"];
    $status = $_POST['txt-status'];
    $od = $_POST['txt-od'];

    //Check Duplicate Name
    $sql = "SELECT * FROM tbl_menu WHERE name = '$name' && id != $editId ";
    $res = $cn->query($sql);
    $num = $res->num_rows; // Jong deng tha vea mean Data ort...!
    $msg['dpl']= true;
   
    $msg['edit']=false;
    if( $num==0 ){

        if($editId==0){
            $sql = "INSERT INTO tbl_menu VALUES(NULL,'$name','$photo','$des','$od','$status')";
            $msg['error'] = true;
            if( $cn->query($sql)){
                $last_id = $cn->insert_id;
                $msg['id'] = $last_id+1;
                $msg['error'] = false;
            
            }
        }else{
            $sql = "UPDATE tbl_menu SET name='$name',des= '$des',img='$photo',status=$status,od=$od WHERE id= $editId";
            $msg['edit']=true;
            if( $cn->query($sql)){
                $last_id = $cn->insert_id;
                //$msg['id'] = $last_id+1;
                //$msg['error'] = false;
                $msg['error'] = false;
                $msg['edit']=true;
                $sql = 'SELECT id FROM tbl_menu ORDER BY id DESC';
                $res = $cn->query($sql);
                $row = $res->fetch_array();
                $msg['id'] = $row[0]+1;

            
            }
        }
        //$msg['error'] = true;
        
        

        
        
        $msg['dpl']= false;
    }
    



    

    echo json_encode($msg);

    
    
?>