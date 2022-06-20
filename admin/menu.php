<?php
    $cn = new mysqli("localhost","root","","php_1");
    $cn->set_charset("utf8");
    $last_id = 1;
    $sql = "SELECT id FROM tbl_menu ORDER BY id DESC";
    $res = $cn->query($sql);
    $num = $res->num_rows; 
    if($num>0){
        $row = $res->fetch_array();
        $last_id = $row[0]+1;
    };
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menu</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="java/jquery-3.2.1.min.js"></script>
    <link rel="stylesheet" href="icon/css/all.min.css">
    
</head>
<body>
    
    
    <a href="content.php">Content Admin</a>

    <div class="frm" style="width:800px;">
        <form class="upl">

            <div style="width:50%; float:left;">
                <input type="hidden" name="txt-edit-id" id="txt-edit-id" value="0">
                <label for="" class="frm-controll" >ID</label>
                <input readonly type="text" name="txt-id" id="txt-id" class="frm-controll" value="<?php echo $last_id ?>">
                <label for="" class="frm-controll">Name</label>
                <input autofocus type="text" name="txt-name" id="txt-name" class="frm-controll" autocomplete="off">


                


                <label for="" class="frm-controll"  >Status (1 = DELETE)</label>
                <select name="txt-status" id="txt-status" class="frm-controll">
                    <option value="0">0</option>
                    <option value="1">1</option>
                </select>
                <label for="" class="frm-controll">OD</label>
                <input type="text" name="txt-od" id="txt-od" class="frm-controll" value="<?php echo $last_id ?>">
                <label for="">Profile</label> <br>
                
                <div class="img-box"> 
                    <input type="file" name="txt-file" id="txt-file" class="txt-file">
                    <input type="hidden" name="txt-photo" id="txt-photo">
                </div>

            </div>
            <div  style="width:50%; float:left; padding-left:5px;">
                <label for="" class="frm-controll">Description</label>
                <textarea name="txt-des" id="txt-des" class="frm-controll" cols="30" rows="20"></textarea>
            </div>
            
            

            
            <div class="btn-save" id="btn-save-menu">
                Save Changes
            </div>
        </form>
    </div>
    

    <table id="tbldata">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th width="50" >Photo</th>
            <th>Description</th>
            <th>OD</th>
            <th>status</th>
            <th width="100">Action</th>
            
            <!-- <th  width="50">Status</th>
            <th  width="50">OD</th> -->
        </tr>
        <?php
        $sql = "SELECT * FROM tbl_menu ORDER BY id DESC";
        $res = $cn->query($sql);
        if( $res->num_rows ){
            while( $row = $res->fetch_array()){
                ?>
                    <tr>
                        <td> <?php echo $row[0] ?> </td>
                        <td> <?php echo $row[1] ?> </td>
                        
                        <td>  
                            <img src="img/<?php echo $row[2] ?>" alt="<?php echo $row[2] ?>">
                        </td>
                        <td> <?php echo $row[3] ?> </td>
                        
                        <td> <?php echo $row[4] ?> </td>
                        <td> <?php echo $row[5] ?> </td>
                        <td>
                            <a class=" btn-edit">
                                <i class="fas fa-edit"></i>
                            </a>
                            <!-- <a class="btn-del">
                                <i class="fas fa-trash"></i>
                            </a> -->
                            
                        </td>
                        
                    </tr>

                <?php
            }
        }
    ?>
    </table>
    
    
    
    
</body>
<script src="java/my-action.js"></script>
</html>