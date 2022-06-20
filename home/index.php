<?php
    $cn = new mysqli("localhost","root","","php_1");
    $cn->set_charset("utf8");
    $htittle='Khmer Empire';
    $hdes='The Khmer Empire, or the Angkorian Empire, are the 
    terms that historians use to refer to Cambodia from 
    the 9th century to the 15th century when the nation 
    was a Hindu/Buddhist empire in Southeast Asia. The 
    empire referred to itself as Kambuja or Kambujadeśa 
    which were ancient terms for Cambodia. The Khmer society 
    was a hierarchial society, groups from highest to lowest. The Society 
    placement was strictly based around the kings and temples.';
    // $menu = $_GET['menu'];
    // echo $menu;
    $cid=0;
    if( isset($_GET['cid']) ){
        $menu = $_GET['menu'];
        $h_color ='cornflowerblue';
        $cid = $_GET['cid'];
    }
    else if( isset($_GET['menu']) ){
        $menu = $_GET['menu'];
        $h_color ='cornflowerblue';
        $sql = "SELECT name,des FROM tbl_menu WHERE id= $menu";
        $res = $cn->query($sql);
        $row= $res->fetch_array();
        $htittle= $row[0];
        $hdes= $row[1];
        
    }else{
        $menu=0;
        $h_color ='rgb(30, 86, 190)';
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cambodia</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-xl-12 col-lg-12 menu-bar">
                <div class="menu">
                    <ul>
                        <li>
                            <a href="index.php" style="background-color: <?php echo $h_color ?>">Home</a>
                        </li>
                        <?php
                            $sql = "SELECT id,name FROM tbl_menu WHERE status=0 ORDER BY od";
                            $res = $cn->query($sql);
                            $num = $res->num_rows;
                            if( $num >0 ){
                                while( $row = $res->fetch_array() ){
                                    if($row[0]== $menu){
                                        $a_color='rgb(30, 86, 190)';
                                    }else{
                                        $a_color='cornflowerblue';
                                    }
                                    ?>
                                        <li>
                                            <a style="background-color: <?php echo $a_color ?>" href="index.php?menu=<?php echo $row[0]?>"><?php echo $row[1] ?></a>
                                        </li>
                                    <?php
                                }
                            }
                        ?>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-12 col-lg-12 ">
                <h1 style="text-align: center; font-size: 20px; margin-top: 5px;"> <?php echo $htittle ?> </h1>
                <p style="text-align: center; margin-top: 5px;" >
                            <?php echo $hdes?>
                </p>
            </div>
        </div>
        <?php
            if( $cid != 0 ){
                include('content-detail.php');
            }
            else if( $menu==0 ){
                include('menu-ct.php');
            }else{
                include('content.php');
            }
            
        ?>
    </div>
</body>
</html>