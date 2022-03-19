git  config --global user.name "Abdelrhman98"
git  config --global user.email "abdelrhman.soleman98@gmail.com"

git add .
git commit -m $1
git push private $2
echo $2