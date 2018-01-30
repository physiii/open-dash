
git remote update

UPSTREAM=${1:-'@{u}'}
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse "$UPSTREAM")
BASE=$(git merge-base @ "$UPSTREAM")

if [ $LOCAL = $REMOTE ]; then
    echo "up-to-date"
elif [ $LOCAL = $BASE ]; then
    git pull
    echo "pulled"    
elif [ $REMOTE = $BASE ]; then
    echo "need to push"
else
    echo "diverged"
fi


